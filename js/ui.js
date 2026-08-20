/* ============================================
   PIPITA — HELPERS DE UI COMPARTILHADOS
   ============================================ */

function formatPrice(v){
  return v.toLocaleString("pt-BR", { style:"currency", currency:"BRL" });
}
function installments(price, n=3){
  return `${n}x de ${formatPrice(price/n)} sem juros`;
}

/* Caminho relativo: raiz vs /pages/ */
function rootPath(){ return location.pathname.includes("/pages/") ? "../" : ""; }
function productLink(product){ return `${rootPath()}pages/produto.html?slug=${product.slug}`; }
function categoryLink(params){
  const usp = new URLSearchParams(params);
  return `${rootPath()}pages/categoria.html?${usp.toString()}`;
}

/* ---------- Toasts ---------- */
function ensureToastWrap(){
  let wrap = document.getElementById("toastWrap");
  if(!wrap){
    wrap = document.createElement("div");
    wrap.className = "toast-wrap";
    wrap.id = "toastWrap";
    document.body.appendChild(wrap);
  }
  return wrap;
}
function showToast(msg, type="ok"){
  const wrap = ensureToastWrap();
  const el = document.createElement("div");
  el.className = "toast" + (type === "error" ? " error" : "");
  el.innerHTML = `<span>${msg}</span>`;
  wrap.appendChild(el);
  setTimeout(() => {
    el.style.opacity = "0";
    el.style.transform = "translateY(8px)";
    setTimeout(() => el.remove(), 250);
  }, 2600);
}

/* ---------- Estrelas ---------- */
function starsMarkup(rating){
  const full = Math.round(rating);
  let out = "";
  for(let i=0;i<5;i++){
    out += `<svg viewBox="0 0 20 20" style="${i<full?"":"opacity:.28"}"><path d="M10 1.5l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L1.3 7.8l6.1-.7z"/></svg>`;
  }
  return out;
}

/* ---------- Badge ---------- */
function badgeMarkup(product){
  if(product.oldPrice) return `<span class="p-badge badge-sale">-${Math.round((1-product.price/product.oldPrice)*100)}%</span>`;
  if(product.badge) return `<span class="p-badge">${product.badge}</span>`;
  return "";
}

/* ---------- Card de produto (grade) ----------
   Galeria com arraste (mouse/touch), swatches de cor,
   e ações rápidas: favoritar, adicionar ao carrinho, comprar agora. */
function productCardMarkup(product){
  const isFav = typeof isFavorite === "function" && isFavorite(product.id);
  const imgs = product.images.slice(0, 4);
  const slides = imgs.map((src,i) => imgTag(src, product.name, "p-card-slide", `data-i="${i}"`)).join("");
  const dots = imgs.length > 1 ? `<div class="p-card-dots">${imgs.map((_,i)=>`<span class="${i===0?"is-active":""}"></span>`).join("")}</div>` : "";
  const swatches = product.colors.length > 1 ? `
    <div class="p-card-swatches" role="group" aria-label="Cores">
      ${product.colors.slice(0,5).map((c,i)=>`<button type="button" class="swatch ${i===0?"is-active":""}" style="--sw:${COLOR_HEX[c]||"#ccc"}" data-color="${c}" title="${c}" aria-label="${c}"></button>`).join("")}
    </div>` : "";

  return `
  <article class="product-card" data-product-id="${product.id}">
    <div class="p-card-media">
      <a href="${productLink(product)}" class="p-card-media-link" aria-label="Ver ${product.name}">
        <div class="p-card-track" style="--n:${imgs.length}">${slides}</div>
      </a>
      ${badgeMarkup(product)}
      <button type="button" class="p-card-fav ${isFav?"is-active":""}" data-fav-toggle="${product.id}" aria-label="Favoritar ${product.name}" aria-pressed="${isFav}">
        <svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.9-10-9.3C.4 8.4 2 4.8 5.6 4.1 8 3.6 10.3 4.7 12 7c1.7-2.3 4-3.4 6.4-2.9 3.6.7 5.2 4.3 3.6 7.6C19.5 16.1 12 21 12 21z"/></svg>
      </button>
      ${dots}
      <div class="p-card-quick">
        <button type="button" class="btn-quick btn-quick-cart" data-add-cart="${product.id}">Adicionar</button>
        <button type="button" class="btn-quick btn-quick-buy" data-buy-now="${product.id}">Comprar</button>
      </div>
    </div>
    <div class="p-card-body">
      <a href="${productLink(product)}" class="p-card-name">${product.name}</a>
      <div class="p-card-rating"><span class="stars">${starsMarkup(product.rating)}</span><span class="p-card-reviews">(${product.reviews})</span></div>
      <div class="p-card-price">
        <span class="price-now">${formatPrice(product.price)}</span>
        ${product.oldPrice ? `<span class="price-old">${formatPrice(product.oldPrice)}</span>` : ""}
      </div>
      <p class="p-card-install">${installments(product.price)}</p>
      ${swatches}
    </div>
  </article>`;
}

function renderProductGrid(container, products){
  if(!container) return;
  if(!products.length){
    container.innerHTML = `
    <div class="state-block" style="grid-column:1/-1">
      <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
      <h3>Nenhum produto encontrado</h3>
      <p>Tente outra busca ou remova alguns filtros.</p>
    </div>`;
    return;
  }
  container.innerHTML = products.map(productCardMarkup).join("");
  initCardGalleries(container);
}

/* ---------- Arraste de imagens nos cards (mouse + touch) ---------- */
function initCardGalleries(scope){
  scope.querySelectorAll(".p-card-media").forEach(media => {
    const track = media.querySelector(".p-card-track");
    const dots = media.querySelectorAll(".p-card-dots span");
    const slides = track.querySelectorAll(".p-card-slide");
    if(slides.length <= 1) return;
    let current = 0, startX = 0, dragging = false, moved = false;

    function goTo(i){
      current = Math.max(0, Math.min(slides.length-1, i));
      track.style.transform = `translateX(-${current*100}%)`;
      dots.forEach((d,idx)=>d.classList.toggle("is-active", idx===current));
    }
    function onDown(x){ dragging = true; moved = false; startX = x; track.style.transition = "none"; }
    function onMove(x){
      if(!dragging) return;
      const delta = x - startX;
      if(Math.abs(delta) > 6) moved = true;
      track.style.transform = `translateX(calc(-${current*100}% + ${delta}px))`;
    }
    function onUp(x){
      if(!dragging) return;
      dragging = false;
      track.style.transition = "";
      const delta = x - startX;
      if(delta < -40) goTo(current+1);
      else if(delta > 40) goTo(current-1);
      else goTo(current);
    }
    media.addEventListener("touchstart", e => onDown(e.touches[0].clientX), {passive:true});
    media.addEventListener("touchmove", e => onMove(e.touches[0].clientX), {passive:true});
    media.addEventListener("touchend", e => onUp(e.changedTouches[0].clientX));
    media.addEventListener("mousedown", e => { e.preventDefault(); onDown(e.clientX); });
    window.addEventListener("mousemove", e => onMove(e.clientX));
    window.addEventListener("mouseup", e => onUp(e.clientX));
    media.querySelector(".p-card-media-link").addEventListener("click", e => { if(moved) e.preventDefault(); });

    /* Trocar imagem ao passar/tocar o swatch de cor (mostra 2ª imagem como "variação") */
    const card = media.closest(".product-card");
    card?.querySelectorAll(".swatch").forEach((sw, idx) => {
      sw.addEventListener("click", () => {
        card.querySelectorAll(".swatch").forEach(s=>s.classList.remove("is-active"));
        sw.classList.add("is-active");
        goTo(idx % slides.length);
      });
    });
  });
}

/* ---------- Delegação global: favoritar / add ao carrinho / comprar agora nos cards ---------- */
document.addEventListener("click", (e) => {
  const favBtn = e.target.closest("[data-fav-toggle]");
  if(favBtn){
    e.preventDefault();
    const id = Number(favBtn.dataset.favToggle);
    const product = getProductById(id);
    if(product && typeof toggleFavorite === "function") toggleFavorite(product, favBtn);
  }
  const addBtn = e.target.closest("[data-add-cart]");
  if(addBtn){
    e.preventDefault();
    const id = Number(addBtn.dataset.addCart);
    const product = getProductById(id);
    if(product) addToCart(product, 1, {
      color: product.colors[0] || null,
      size: product.sizes[0] || null
    });
  }
  const buyBtn = e.target.closest("[data-buy-now]");
  if(buyBtn){
    e.preventDefault();
    const id = Number(buyBtn.dataset.buyNow);
    const product = getProductById(id);
    if(product){
      addToCart(product, 1, { color: product.colors[0] || null, size: product.sizes[0] || null }, { silent:true });
      window.location.href = `${rootPath()}pages/carrinho.html`;
    }
  }
});

/* ---------- Reveal on scroll ---------- */
function initScrollReveal(){
  const items = document.querySelectorAll(".reveal");
  if(!items.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => { if(en.isIntersecting){ en.target.classList.add("is-visible"); io.unobserve(en.target); } });
  }, { threshold:.12 });
  items.forEach(el => io.observe(el));
}
document.addEventListener("DOMContentLoaded", initScrollReveal);
