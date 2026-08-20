/* ============================================
   PIPITA — PÁGINA DE PRODUTO
   Galeria com arraste, seleção de variações (cor/tamanho),
   quantidade, adicionar ao carrinho, comprar agora,
   descrição/detalhes e produtos relacionados.
   ============================================ */

function galleryMarkup(product){
  const imgs = product.images;
  return `
    <div class="gallery">
      <div class="gallery-main" id="galleryMain">
        <div class="gallery-track" id="galleryTrack" style="--n:${imgs.length}">
          ${imgs.map(src => `<div class="gallery-slide">${imgTag(src, product.name)}</div>`).join("")}
        </div>
        <button class="gallery-nav prev" id="galleryPrev" aria-label="Foto anterior">‹</button>
        <button class="gallery-nav next" id="galleryNext" aria-label="Próxima foto">›</button>
        <div class="gallery-dots" id="galleryDots">
          ${imgs.map((_,i)=>`<span class="${i===0?"is-active":""}"></span>`).join("")}
        </div>
      </div>
      <div class="gallery-thumbs">
        ${imgs.map((src,i)=>`<button class="gallery-thumb ${i===0?"is-active":""}" data-thumb="${i}">${imgTag(src, product.name+" miniatura "+(i+1))}</button>`).join("")}
      </div>
    </div>`;
}

function initGallery(product){
  const track = document.getElementById("galleryTrack");
  const dots = document.querySelectorAll("#galleryDots span");
  const thumbs = document.querySelectorAll(".gallery-thumb");
  const prev = document.getElementById("galleryPrev");
  const next = document.getElementById("galleryNext");
  const total = product.images.length;
  let current = 0, startX = 0, dragging = false;

  function goTo(i){
    current = (i + total) % total;
    track.style.transform = `translateX(-${current*100}%)`;
    dots.forEach((d,idx)=>d.classList.toggle("is-active", idx===current));
    thumbs.forEach((t,idx)=>t.classList.toggle("is-active", idx===current));
  }
  prev?.addEventListener("click", () => goTo(current-1));
  next?.addEventListener("click", () => goTo(current+1));
  thumbs.forEach((t,i) => t.addEventListener("click", () => goTo(i)));

  const main = document.getElementById("galleryMain");
  function onDown(x){ dragging = true; startX = x; track.style.transition = "none"; }
  function onMove(x){ if(!dragging) return; track.style.transform = `translateX(calc(-${current*100}% + ${x-startX}px))`; }
  function onUp(x){
    if(!dragging) return;
    dragging = false;
    track.style.transition = "";
    const delta = x - startX;
    if(delta < -50) goTo(current+1);
    else if(delta > 50) goTo(current-1);
    else goTo(current);
  }
  main.addEventListener("touchstart", e => onDown(e.touches[0].clientX), {passive:true});
  main.addEventListener("touchmove", e => onMove(e.touches[0].clientX), {passive:true});
  main.addEventListener("touchend", e => onUp(e.changedTouches[0].clientX));
  main.addEventListener("mousedown", e => { e.preventDefault(); onDown(e.clientX); });
  window.addEventListener("mousemove", e => onMove(e.clientX));
  window.addEventListener("mouseup", e => onUp(e.clientX));

  return { goTo };
}

function renderProductPage(){
  const root = document.getElementById("productRoot");
  if(!root) return;
  const slug = new URLSearchParams(location.search).get("slug");
  const product = getProductBySlug(slug) || PRODUCTS[0];
  if(!product){ root.innerHTML = "<p>Produto não encontrado.</p>"; return; }

  document.title = `${product.name} — Pipita`;
  document.getElementById("breadcrumbCat").textContent = getCategoryLabel(product.category);
  document.getElementById("breadcrumbCat").href = categoryLink({category:product.category});
  document.getElementById("breadcrumbName").textContent = product.name;

  const hasColors = product.colors.length > 0;
  const hasSizes = product.sizes.length > 0;

  root.innerHTML = `
    ${galleryMarkup(product)}
    <div class="product-info">
      ${product.badge && !product.oldPrice ? `<span class="p-badge static">${product.badge}</span>` : ""}
      <h1>${product.name}</h1>
      <div class="p-card-rating"><span class="stars">${starsMarkup(product.rating)}</span><span class="p-card-reviews">${product.rating.toFixed(1)} · ${product.reviews} avaliações</span></div>
      <div class="product-price-row">
        <span class="price-now">${formatPrice(product.price)}</span>
        ${product.oldPrice ? `<span class="price-old">${formatPrice(product.oldPrice)}</span><span class="p-badge badge-sale static">-${Math.round((1-product.price/product.oldPrice)*100)}%</span>` : ""}
      </div>
      <p class="product-installments">${installments(product.price)} · <strong style="color:var(--success)">${product.stock > 0 ? `Em estoque (${product.stock} un.)` : "Sob encomenda"}</strong></p>

      <p class="product-desc">${product.description}</p>

      ${hasColors ? `
      <div class="variant-group">
        <span class="variant-label">Cor: <strong id="selColor">${product.colors[0]}</strong></span>
        <div class="variant-swatches" id="colorSwatches" role="group" aria-label="Escolha a cor">
          ${product.colors.map((c,i)=>`<button type="button" class="swatch ${i===0?"is-active":""}" style="--sw:${COLOR_HEX[c]||"#ccc"}" data-color="${c}" title="${c}" aria-label="${c}"></button>`).join("")}
        </div>
      </div>` : ""}

      ${hasSizes ? `
      <div class="variant-group">
        <span class="variant-label">Tamanho: <strong id="selSize">${product.sizes[0]}</strong></span>
        <div class="variant-sizes" id="sizeOptions" role="group" aria-label="Escolha o tamanho">
          ${product.sizes.map((s,i)=>`<button type="button" class="size-opt ${i===0?"is-active":""}" data-size="${s}">${s}</button>`).join("")}
        </div>
      </div>` : ""}

      <div class="variant-group">
        <span class="variant-label">Quantidade</span>
        <div class="qty-stepper qty-stepper-lg">
          <button id="qtyDec" aria-label="Diminuir quantidade">–</button>
          <input id="qtyInput" value="1" readonly aria-label="Quantidade">
          <button id="qtyInc" aria-label="Aumentar quantidade">+</button>
        </div>
      </div>

      <div class="product-actions">
        <button class="btn btn-primary btn-block" id="addToCartBtn">Adicionar ao carrinho</button>
        <button class="btn btn-gold btn-block" id="buyNowBtn">Comprar agora</button>
        <button class="icon-btn fav-btn-lg ${isFavorite(product.id)?"is-active":""}" id="favBtnLg" data-fav-toggle="${product.id}" aria-label="Favoritar" aria-pressed="${isFavorite(product.id)}">
          <svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.9-10-9.3C.4 8.4 2 4.8 5.6 4.1 8 3.6 10.3 4.7 12 7c1.7-2.3 4-3.4 6.4-2.9 3.6.7 5.2 4.3 3.6 7.6C19.5 16.1 12 21 12 21z"/></svg>
        </button>
      </div>

      <ul class="trust-list">
        <li>✓ Frete grátis acima de R$ 199</li>
        <li>✓ Troca grátis em até 30 dias</li>
        <li>✓ Compra 100% segura</li>
      </ul>

      <details class="product-accordion" open>
        <summary>Detalhes do produto</summary>
        <ul>${product.details.map(d=>`<li>${d}</li>`).join("")}</ul>
      </details>
      <details class="product-accordion">
        <summary>Envio e trocas</summary>
        <p>Enviamos para todo o Brasil. Prazo médio de 5 a 10 dias úteis. Trocas gratuitas em até 30 dias após o recebimento, desde que o produto esteja sem uso e com a embalagem original.</p>
      </details>
    </div>
  `;

  const gallery = initGallery(product);
  let selectedColor = product.colors[0] || null;
  let selectedSize = product.sizes[0] || null;
  let qty = 1;

  document.getElementById("colorSwatches")?.addEventListener("click", e => {
    const btn = e.target.closest("[data-color]");
    if(!btn) return;
    selectedColor = btn.dataset.color;
    document.querySelectorAll("#colorSwatches .swatch").forEach(s=>s.classList.remove("is-active"));
    btn.classList.add("is-active");
    document.getElementById("selColor").textContent = selectedColor;
    const idx = product.colors.indexOf(selectedColor);
    if(idx >= 0 && idx < product.images.length) gallery.goTo(idx);
  });
  document.getElementById("sizeOptions")?.addEventListener("click", e => {
    const btn = e.target.closest("[data-size]");
    if(!btn) return;
    selectedSize = btn.dataset.size;
    document.querySelectorAll("#sizeOptions .size-opt").forEach(s=>s.classList.remove("is-active"));
    btn.classList.add("is-active");
    document.getElementById("selSize").textContent = selectedSize;
  });
  document.getElementById("qtyDec")?.addEventListener("click", () => { qty = Math.max(1, qty-1); document.getElementById("qtyInput").value = qty; });
  document.getElementById("qtyInc")?.addEventListener("click", () => { qty = qty+1; document.getElementById("qtyInput").value = qty; });

  document.getElementById("addToCartBtn")?.addEventListener("click", () => {
    addToCart(product, qty, { color:selectedColor, size:selectedSize });
  });
  document.getElementById("buyNowBtn")?.addEventListener("click", () => {
    addToCart(product, qty, { color:selectedColor, size:selectedSize }, { silent:true });
    window.location.href = `${rootPath()}pages/carrinho.html`;
  });

  const related = relatedProducts(product, 4);
  const relatedGrid = document.getElementById("relatedGrid");
  if(relatedGrid) renderProductGrid(relatedGrid, related);
}

document.addEventListener("DOMContentLoaded", renderProductPage);
