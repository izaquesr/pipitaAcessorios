/* ============================================
   PIPITA — APP BOOTSTRAP
   Configurações globais e comportamento de header/menu.
   ============================================ */

/* Texto da barra de aviso — fácil de alterar em um único lugar */
const ANNOUNCEMENT_TEXT = "Frete grátis nas compras acima de R$199 · Parcele em até 3x sem juros";

function closeMobileNav(){
  document.getElementById("mobileNav")?.classList.remove("is-open");
  document.getElementById("hamburger")?.classList.remove("is-active");
  document.getElementById("scrim")?.classList.remove("is-open");
  document.body.style.overflow = "";
}

document.addEventListener("DOMContentLoaded", () => {
  // Announcement bar
  const bar = document.getElementById("announceText");
  if(bar) bar.textContent = ANNOUNCEMENT_TEXT;

  // Header sticky shadow on scroll
  const header = document.getElementById("siteHeader");
  if(header){
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Mobile nav toggle
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobileNav");
  const scrim = document.getElementById("scrim");
  hamburger?.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("is-open");
    hamburger.classList.toggle("is-active", isOpen);
    scrim?.classList.toggle("is-open", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  });
  document.getElementById("mobileNavClose")?.addEventListener("click", closeMobileNav);

  // Escape key closes any open overlay
  document.addEventListener("keydown", (e) => {
    if(e.key === "Escape"){
      closeMobileNav();
      closeSearchPanel?.();
      closeCartDrawer?.();
      document.getElementById("filterDrawer")?.classList.remove("is-open");
      document.getElementById("filterDrawerOverlay")?.classList.remove("is-open");
    }
  });

  // Newsletter forms (simulação)
  document.querySelectorAll(".newsletter-form").forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      showToast("Obrigado por assinar nossa newsletter!");
      form.reset();
    });
  });
});
