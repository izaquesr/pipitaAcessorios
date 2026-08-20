/* ============================================
   PIPITA — LAYOUT (header, drawers, footer)
   Injeta o "chrome" do site uma única vez por página,
   a partir de placeholders <div data-slot="...">.
   Isso evita duplicação de markup entre páginas — a causa
   do bug antigo do carrinho aparecendo fora de hora.
   ============================================ */

function navLinksMarkup(){
  const R = rootPath();
  return `
    <li><a href="${R}pages/categoria.html?gender=feminino">Feminino</a></li>
    <li><a href="${R}pages/categoria.html?gender=masculino">Masculino</a></li>
    <li><a href="${R}pages/categoria.html">Joias</a></li>
    <li><a href="${R}pages/categoria.html?category=colares">Colares</a></li>
    <li><a href="${R}pages/categoria.html?category=aneis">Anéis</a></li>
    <li><a href="${R}pages/categoria.html?view=colecoes">Coleções</a></li>
  `;
}

function headerMarkup(){
  const R = rootPath();
  return `
  <div class="announce-bar">Frete grátis para todo o Brasil em compras acima de R$ 199 · Parcele em até 3x sem juros</div>
  <header class="site-header" id="siteHeader">
    <div class="container header-row">
      <button class="icon-btn hamburger" id="hamburgerBtn" aria-label="Abrir menu" aria-expanded="false">
        <svg viewBox="0 0 24 24"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
      </button>
      <a href="${R}index.html" class="logo">Pipita</a>
      <nav class="main-nav" aria-label="Navegação principal">
        <ul>${navLinksMarkup()}</ul>
      </nav>
      <div class="header-actions">
        <button class="icon-btn" id="searchToggle" aria-label="Buscar">
          <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
        </button>
        <a href="${R}pages/login.html" class="icon-btn" aria-label="Minha conta">
          <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c1.5-4 5-6 8-6s6.5 2 8 6"/></svg>
        </a>
        <a href="${R}pages/favoritos.html" class="icon-btn" aria-label="Favoritos">
          <svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.9-10-9.3C.4 8.4 2 4.8 5.6 4.1 8 3.6 10.3 4.7 12 7c1.7-2.3 4-3.4 6.4-2.9 3.6.7 5.2 4.3 3.6 7.6C19.5 16.1 12 21 12 21z"/></svg>
          <span class="badge-count" data-fav-count style="display:none">0</span>
        </a>
        <button class="icon-btn" id="cartToggle" aria-label="Carrinho">
          <svg viewBox="0 0 24 24"><path d="M3 3h2l2.4 12.4a2 2 0 0 0 2 1.6h8.7a2 2 0 0 0 2-1.6L22 8H6"/><circle cx="9" cy="21" r="1"/><circle cx="18" cy="21" r="1"/></svg>
          <span class="badge-count" data-cart-count style="display:none">0</span>
        </button>
      </div>
    </div>
  </header>`;
}

/* Painel de busca, menu mobile e drawer do carrinho ficam FORA do <header>,
   direto no <body>. Isso evita que o contexto de empilhamento (stacking
   context) do header (position:sticky) prenda o z-index desses overlays —
   a causa raiz do bug antigo em que camadas ficavam presas atrás do lugar
   errado e não fechavam. */
function searchPanelMarkup(){
  return `
  <div class="search-panel" id="searchPanel">
    <div class="container search-panel-inner">
      <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
      <input type="search" id="searchInput" placeholder="Buscar colares, anéis, presentes..." autocomplete="off">
      <button id="searchClose" class="icon-btn" aria-label="Fechar busca">
        <svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>
      </button>
    </div>
    <div class="search-results container" id="searchResults"></div>
  </div>`;
}
function mobileNavMarkup(){
  const R = rootPath();
  return `
  <nav class="mobile-nav" id="mobileNav" aria-label="Navegação mobile">
    <div class="mobile-nav-head">
      <span class="logo">Pipita</span>
      <button class="icon-btn" id="mobileNavClose" aria-label="Fechar menu">
        <svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>
      </button>
    </div>
    <ul>${navLinksMarkup()}</ul>
    <ul class="mobile-nav-secondary">
      <li><a href="${R}pages/login.html">Minha conta</a></li>
      <li><a href="${R}pages/favoritos.html">Favoritos</a></li>
      <li><a href="${R}pages/carrinho.html">Carrinho</a></li>
    </ul>
  </nav>`;
}

function cartDrawerMarkup(){
  return `
  <aside class="cart-drawer" id="cartDrawer" aria-label="Carrinho de compras" role="dialog" aria-modal="true">
    <div class="cart-drawer-head">
      <h3>Seu carrinho</h3>
      <button class="icon-btn" id="cartDrawerClose" aria-label="Fechar carrinho" data-close-cart>
        <svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>
      </button>
    </div>
    <div class="cart-drawer-body" id="cartDrawerBody"></div>
    <div class="cart-drawer-foot" id="cartDrawerFoot"></div>
  </aside>
  <div class="scrim" id="scrim"></div>`;
}

function footerMarkup(){
  const R = rootPath();
  return `
  <footer class="site-footer">
    <div class="container footer-top">
      <div class="footer-brand">
        <a href="${R}index.html" class="logo">Pipita</a>
        <p>Joias e acessórios folheados, pensados para o seu dia a dia — atemporais, acessíveis e feitos para durar.</p>
        <div class="footer-social" aria-label="Redes sociais">
          <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg></a>
          <a href="#" aria-label="TikTok"><svg viewBox="0 0 24 24"><path d="M15 3v10.5a3.5 3.5 0 1 1-3-3.46"/><path d="M15 3c.5 2.5 2 4 5 4.3"/></svg></a>
          <a href="#" aria-label="WhatsApp"><svg viewBox="0 0 24 24"><path d="M21 12a9 9 0 1 1-4-7.5"/><path d="M21 3l-6 6"/></svg></a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Comprar</h4>
        <ul>
          <li><a href="${R}pages/categoria.html?gender=feminino">Feminino</a></li>
          <li><a href="${R}pages/categoria.html?gender=masculino">Masculino</a></li>
          <li><a href="${R}pages/categoria.html?category=colares">Colares</a></li>
          <li><a href="${R}pages/categoria.html?category=aneis">Anéis</a></li>
          <li><a href="${R}pages/categoria.html?view=colecoes">Coleções</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Ajuda</h4>
        <ul>
          <li><a href="#">Trocas e devoluções</a></li>
          <li><a href="#">Prazo de entrega</a></li>
          <li><a href="#">Guia de tamanhos</a></li>
          <li><a href="#">Fale conosco</a></li>
        </ul>
      </div>
      <div class="footer-col footer-newsletter">
        <h4>Fique por dentro</h4>
        <p>Novidades e ofertas exclusivas no seu e-mail.</p>
        <form class="form-row" id="newsletterForm">
          <input type="email" placeholder="Seu e-mail" required>
          <button class="btn btn-gold btn-sm" type="submit">Enviar</button>
        </form>
      </div>
    </div>
    <div class="container footer-bottom">
      <p>© ${new Date().getFullYear()} Pipita. Todos os direitos reservados.</p>
      <p class="text-muted">Ambiente de demonstração — pronto para virar tema Nuvemshop.</p>
    </div>
  </footer>`;
}

function injectLayout(){
  const headerSlot = document.getElementById("siteHeaderSlot");
  const footerSlot = document.getElementById("siteFooterSlot");
  if(headerSlot) headerSlot.outerHTML = headerMarkup();
  if(footerSlot) footerSlot.outerHTML = footerMarkup();
  document.body.insertAdjacentHTML("beforeend", searchPanelMarkup());
  document.body.insertAdjacentHTML("beforeend", mobileNavMarkup());
  document.body.insertAdjacentHTML("beforeend", cartDrawerMarkup());
  ensureToastWrap();
  initLayoutBehavior();
}

function initLayoutBehavior(){
  const hamburger = document.getElementById("hamburgerBtn");
  const mobileNav = document.getElementById("mobileNav");
  const mobileNavClose = document.getElementById("mobileNavClose");
  const scrim = document.getElementById("scrim");
  const searchToggle = document.getElementById("searchToggle");
  const searchPanel = document.getElementById("searchPanel");
  const searchClose = document.getElementById("searchClose");
  const searchInput = document.getElementById("searchInput");

  function closeAllOverlays(){
    mobileNav?.classList.remove("is-open");
    hamburger?.setAttribute("aria-expanded","false");
    searchPanel?.classList.remove("is-open");
    document.getElementById("cartDrawer")?.classList.remove("is-open");
    scrim?.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  hamburger?.addEventListener("click", () => {
    const open = !mobileNav.classList.contains("is-open");
    closeAllOverlays();
    if(open){
      mobileNav.classList.add("is-open");
      hamburger.setAttribute("aria-expanded","true");
      scrim.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }
  });
  mobileNavClose?.addEventListener("click", closeAllOverlays);

  searchToggle?.addEventListener("click", () => {
    const open = !searchPanel.classList.contains("is-open");
    closeAllOverlays();
    if(open){
      const headerRect = document.getElementById("siteHeader").getBoundingClientRect();
      searchPanel.style.top = `${headerRect.bottom}px`;
      searchPanel.classList.add("is-open");
      scrim.classList.add("is-open");
      setTimeout(()=>searchInput?.focus(), 50);
    }
  });
  searchClose?.addEventListener("click", closeAllOverlays);
  searchInput?.addEventListener("input", () => renderLiveSearch(searchInput.value));

  scrim?.addEventListener("click", closeAllOverlays);
  document.addEventListener("keydown", e => { if(e.key === "Escape") closeAllOverlays(); });

  document.getElementById("cartDrawerClose")?.addEventListener("click", closeAllOverlays);
  document.querySelectorAll("[data-close-cart]").forEach(b => b.addEventListener("click", closeAllOverlays));

  document.getElementById("cartToggle")?.addEventListener("click", () => {
    const open = !document.getElementById("cartDrawer").classList.contains("is-open");
    closeAllOverlays();
    if(open){
      document.getElementById("cartDrawer").classList.add("is-open");
      scrim.classList.add("is-open");
      document.body.style.overflow = "hidden";
      renderCartDrawer();
    }
  });

  document.getElementById("newsletterForm")?.addEventListener("submit", e => {
    e.preventDefault();
    showToast("Inscrição confirmada! Fique de olho no seu e-mail. 💌");
    e.target.reset();
  });

  updateCartCount();
  updateFavCount();
}

document.addEventListener("DOMContentLoaded", injectLayout);
