/* ============================================
   PIPITA — CARRINHO (localStorage)
   CRUD completo: adicionar, editar quantidade, remover
   (com mensagem de confirmação), calcular totais.
   Ao migrar para a Nuvemshop, substituir estas funções
   pela API de carrinho da plataforma.
   ============================================ */

const CART_KEY = "pipita_cart";
const FREE_SHIPPING_THRESHOLD = 199;
const VALID_COUPONS = { "PIPITA10": 0.10, "BEMVINDA": 0.15 };

function getCart(){
  try{ return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch{ return []; }
}
function saveCart(cart){
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}
function cartItemKey(id, opts){
  return `${id}__${opts.size || ""}__${opts.color || ""}`;
}

/* CREATE / UPDATE quantidade */
function addToCart(product, qty = 1, opts = {}, meta = {}){
  const cart = getCart();
  const key = cartItemKey(product.id, opts);
  const existing = cart.find(i => i.key === key);
  if(existing){
    existing.qty += qty;
  }else{
    cart.push({
      key, id: product.id, name: product.name, price: product.price,
      image: product.images[0], size: opts.size || null, color: opts.color || null, qty
    });
  }
  saveCart(cart);
  if(!meta.silent) showToast(`"${product.name}" adicionado ao carrinho.`);
  renderCartDrawer();
  if(document.getElementById("cartPageList")) renderCartPage();
}

/* DELETE (com mensagem de confirmação) */
function removeFromCart(key, opts = {}){
  const cart = getCart();
  const item = cart.find(i => i.key === key);
  if(!item) return;
  if(!opts.skipConfirm && !window.confirm(`Remover "${item.name}" do carrinho?`)) return;
  const next = cart.filter(i => i.key !== key);
  saveCart(next);
  showToast(`"${item.name}" foi removido do carrinho.`);
  renderCartDrawer();
  if(document.getElementById("cartPageList")) renderCartPage();
}

/* UPDATE quantidade (edição) */
function changeCartQty(key, qty){
  const cart = getCart();
  const item = cart.find(i => i.key === key);
  if(!item) return;
  if(qty < 1){ removeFromCart(key); return; }
  item.qty = qty;
  saveCart(cart);
  renderCartDrawer();
  if(document.getElementById("cartPageList")) renderCartPage();
}

function clearCart(){
  if(!window.confirm("Esvaziar todo o carrinho?")) return;
  saveCart([]);
  showToast("Carrinho esvaziado.");
  renderCartDrawer();
  if(document.getElementById("cartPageList")) renderCartPage();
}

function getCartTotals(couponCode = ""){
  const cart = getCart();
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const discountRate = VALID_COUPONS[couponCode.toUpperCase()] || 0;
  const discount = subtotal * discountRate;
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 19.90;
  const total = Math.max(0, subtotal - discount + shipping);
  return { subtotal, discount, shipping, total, count: cart.reduce((n,i)=>n+i.qty,0) };
}

function updateCartCount(){
  const count = getCart().reduce((n,i)=>n+i.qty,0);
  document.querySelectorAll("[data-cart-count]").forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? "flex" : "none";
  });
}

function cartItemRow(i, big){
  const imgSize = big ? `width="96" height="110"` : `width="84" height="96"`;
  return `
    <div class="cart-item" data-key="${i.key}">
      ${imgTag(i.image, i.name, "", imgSize)}
      <div class="cart-item-body">
        <p class="cart-item-name">${i.name}</p>
        <p class="cart-item-meta">${[i.color, i.size ? "Tam. "+i.size : null].filter(Boolean).join(" · ") || "Padrão"}</p>
        <div class="cart-item-row">
          <div class="qty-stepper">
            <button data-qty-dec="${i.key}" aria-label="Diminuir quantidade">–</button>
            <input value="${i.qty}" readonly aria-label="Quantidade" data-qty-input="${i.key}">
            <button data-qty-inc="${i.key}" aria-label="Aumentar quantidade">+</button>
          </div>
          <span class="price">${formatPrice(i.price * i.qty)}</span>
        </div>
        <div class="cart-item-actions">
          <button class="cart-item-remove" data-remove="${i.key}">
            <svg viewBox="0 0 24 24" width="14" height="14"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></svg>
            Remover
          </button>
        </div>
      </div>
    </div>`;
}

function emptyCartMarkup(cta){
  return `
    <div class="state-block">
      <svg viewBox="0 0 24 24"><path d="M3 3h2l2.4 12.4a2 2 0 0 0 2 1.6h8.7a2 2 0 0 0 2-1.6L22 8H6"/><circle cx="9" cy="21" r="1"/><circle cx="18" cy="21" r="1"/></svg>
      <h3>Seu carrinho está vazio</h3>
      <p>Explore nossa coleção e encontre a peça perfeita para você.</p>
      ${cta}
    </div>`;
}

/* ============ MINI CARRINHO (drawer) ============ */
function renderCartDrawer(){
  const body = document.getElementById("cartDrawerBody");
  const foot = document.getElementById("cartDrawerFoot");
  if(!body || !foot) return;
  const cart = getCart();
  const { subtotal, shipping } = getCartTotals();

  if(!cart.length){
    body.innerHTML = emptyCartMarkup(`<a href="${rootPath()}index.html" class="btn btn-primary btn-sm" data-close-cart>Continuar comprando</a>`);
    foot.innerHTML = "";
    return;
  }

  body.innerHTML = cart.map(i => cartItemRow(i, false)).join("");
  foot.innerHTML = `
    <p class="cart-shipnote">${shipping === 0 ? "Você garantiu frete grátis! 🎉" : `Faltam ${formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} para o frete grátis.`}</p>
    <div class="cart-subtotal-row total"><span>Subtotal</span><span>${formatPrice(subtotal)}</span></div>
    <a href="${rootPath()}pages/carrinho.html" class="btn btn-primary btn-block mt-4">Finalizar compra</a>
    <button class="btn btn-outline btn-block mt-2" data-close-cart>Continuar comprando</button>
  `;
}

/* ============ PÁGINA COMPLETA DO CARRINHO ============ */
function renderCartPage(){
  const list = document.getElementById("cartPageList");
  const summary = document.getElementById("cartPageSummary");
  if(!list || !summary) return;
  const cart = getCart();
  const appliedCoupon = summary.dataset.coupon || "";

  if(!cart.length){
    list.innerHTML = emptyCartMarkup(`<a href="${rootPath()}index.html" class="btn btn-primary btn-sm">Ver coleção</a>`);
    summary.innerHTML = "";
    return;
  }

  list.innerHTML = `
    <div class="cart-list-head">
      <span>${cart.reduce((n,i)=>n+i.qty,0)} ite${cart.length>1?"ns":"m"} no carrinho</span>
      <button class="link-arrow" id="clearCartBtn">Esvaziar carrinho</button>
    </div>
    ${cart.map(i => cartItemRow(i, true)).join("")}`;

  const { subtotal, discount, shipping, total } = getCartTotals(appliedCoupon);
  summary.innerHTML = `
    <h3>Resumo do pedido</h3>
    <div class="coupon-row">
      <input type="text" id="couponInput" placeholder="Cupom de desconto" value="${appliedCoupon}">
      <button class="btn-sm" id="applyCouponBtn">Aplicar</button>
    </div>
    <div class="cart-subtotal-row"><span>Subtotal</span><span>${formatPrice(subtotal)}</span></div>
    ${discount > 0 ? `<div class="cart-subtotal-row" style="color:var(--success)"><span>Desconto (${appliedCoupon.toUpperCase()})</span><span>-${formatPrice(discount)}</span></div>` : ""}
    <div class="cart-subtotal-row"><span>Frete estimado</span><span>${shipping === 0 ? "Grátis" : formatPrice(shipping)}</span></div>
    <div class="cart-subtotal-row total"><span>Total</span><span>${formatPrice(total)}</span></div>
    <button class="btn btn-primary btn-block mt-4" id="checkoutBtn">Finalizar compra</button>
    <a href="${rootPath()}index.html" class="btn btn-outline btn-block mt-2">Continuar comprando</a>
    <p class="text-muted" style="font-size:.76rem;margin-top:12px;text-align:center">Ambiente de demonstração — o checkout real será processado pela Nuvemshop.</p>
  `;

  document.getElementById("applyCouponBtn")?.addEventListener("click", () => {
    const code = document.getElementById("couponInput").value.trim();
    if(VALID_COUPONS[code.toUpperCase()]){
      summary.dataset.coupon = code;
      showToast("Cupom aplicado com sucesso!");
    }else if(code){
      showToast("Cupom inválido.", "error");
    }
    renderCartPage();
  });
  document.getElementById("checkoutBtn")?.addEventListener("click", () => {
    showToast("Simulação: você seria redirecionado ao checkout seguro da Nuvemshop. 🛍️");
  });
  document.getElementById("clearCartBtn")?.addEventListener("click", clearCart);
}

/* ============ Delegação de eventos (qty +/-, remover) ============ */
document.addEventListener("click", (e) => {
  const inc = e.target.closest("[data-qty-inc]");
  const dec = e.target.closest("[data-qty-dec]");
  const rem = e.target.closest("[data-remove]");
  if(inc){
    const item = getCart().find(i => i.key === inc.dataset.qtyInc);
    if(item) changeCartQty(item.key, item.qty + 1);
  }
  if(dec){
    const item = getCart().find(i => i.key === dec.dataset.qtyDec);
    if(item) changeCartQty(item.key, item.qty - 1);
  }
  if(rem){
    removeFromCart(rem.dataset.remove);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderCartDrawer();
  renderCartPage();
});
