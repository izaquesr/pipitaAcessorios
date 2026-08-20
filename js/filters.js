/* ============================================
   PIPITA — FILTROS E ORDENAÇÃO (página de categoria)
   Lê parâmetros da URL para definir categoria/gênero inicial
   e aplica filtros client-side sobre PRODUCTS.
   ============================================ */

function applyFilters(products, state){
  return products.filter(p => {
    if(state.categories.length && !state.categories.includes(p.category)) return false;
    if(state.genders.length && !state.genders.includes(p.gender)) return false;
    if(state.colors.length && !p.colors.some(c => state.colors.includes(c))) return false;
    if(state.sizes.length && !p.sizes.some(s => state.sizes.includes(s))) return false;
    if(state.onSale && !p.oldPrice) return false;
    if(state.inStock && p.stock <= 0) return false;
    if(state.minPrice != null && p.price < state.minPrice) return false;
    if(state.maxPrice != null && p.price > state.maxPrice) return false;
    return true;
  });
}

function sortProducts(products, sortBy){
  const list = [...products];
  switch(sortBy){
    case "price-asc": return list.sort((a,b) => a.price - b.price);
    case "price-desc": return list.sort((a,b) => b.price - a.price);
    case "newest": return list.sort((a,b) => b.id - a.id);
    case "bestsellers": return list.sort((a,b) => (b.badge === "Mais vendido") - (a.badge === "Mais vendido"));
    default: return list;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("categoryGrid");
  if(!grid) return;

  const params = new URLSearchParams(location.search);
  const state = {
    categories: params.get("categoria") ? [params.get("categoria")] : [],
    genders: params.get("genero") ? [params.get("genero")] : [],
    colors: [],
    sizes: [],
    onSale: false,
    inStock: false,
    minPrice: null,
    maxPrice: null
  };

  const titleEl = document.getElementById("categoryTitle");
  const headingEl = document.getElementById("categoryTitleHeading");
  const descEl = document.getElementById("categoryDesc");
  const countEl = document.getElementById("categoryCount");
  const sortSelect = document.getElementById("sortSelect");

  function labelFor(){
    if(state.categories.length && state.genders.length) return `${state.categories[0]} ${state.genders[0] === "Feminino" ? "Femininos" : "Masculinos"}`;
    if(state.categories.length) return state.categories[0];
    if(state.genders.length) return state.genders[0];
    return "Todos os produtos";
  }

  function render(){
    let list = applyFilters(PRODUCTS, state);
    list = sortProducts(list, sortSelect ? sortSelect.value : "relevance");
    if(titleEl) titleEl.textContent = labelFor();
    if(headingEl) headingEl.textContent = labelFor();
    if(countEl) countEl.textContent = `${list.length} produto${list.length === 1 ? "" : "s"}`;
    renderProductGrid(grid, list, "Nenhum produto encontrado para os filtros selecionados.");
  }

  document.querySelectorAll("[data-filter-category]").forEach(el => {
    el.checked = state.categories.includes(el.value);
    el.addEventListener("change", () => {
      state.categories = [...document.querySelectorAll("[data-filter-category]:checked")].map(i => i.value);
      render();
    });
  });
  document.querySelectorAll("[data-filter-gender]").forEach(el => {
    el.checked = state.genders.includes(el.value);
    el.addEventListener("change", () => {
      state.genders = [...document.querySelectorAll("[data-filter-gender]:checked")].map(i => i.value);
      render();
    });
  });
  document.querySelectorAll("[data-filter-color]").forEach(el => {
    el.addEventListener("click", () => {
      el.classList.toggle("is-selected");
      state.colors = [...document.querySelectorAll("[data-filter-color].is-selected")].map(i => i.dataset.filterColor);
      render();
    });
  });
  document.querySelectorAll("[data-filter-size]").forEach(el => {
    el.addEventListener("click", () => {
      el.classList.toggle("is-selected");
      state.sizes = [...document.querySelectorAll("[data-filter-size].is-selected")].map(i => i.dataset.filterSize);
      render();
    });
  });
  document.getElementById("filterSale")?.addEventListener("change", (e) => { state.onSale = e.target.checked; render(); });
  document.getElementById("filterStock")?.addEventListener("change", (e) => { state.inStock = e.target.checked; render(); });
  document.getElementById("minPrice")?.addEventListener("input", (e) => { state.minPrice = e.target.value ? Number(e.target.value) : null; render(); });
  document.getElementById("maxPrice")?.addEventListener("input", (e) => { state.maxPrice = e.target.value ? Number(e.target.value) : null; render(); });
  sortSelect?.addEventListener("change", render);

  document.getElementById("clearFilters")?.addEventListener("click", () => {
    state.categories = []; state.genders = []; state.colors = []; state.sizes = [];
    state.onSale = false; state.inStock = false; state.minPrice = null; state.maxPrice = null;
    document.querySelectorAll("[data-filter-category],[data-filter-gender]").forEach(i => i.checked = false);
    document.querySelectorAll("[data-filter-color],[data-filter-size]").forEach(i => i.classList.remove("is-selected"));
    if(document.getElementById("filterSale")) document.getElementById("filterSale").checked = false;
    if(document.getElementById("filterStock")) document.getElementById("filterStock").checked = false;
    if(document.getElementById("minPrice")) document.getElementById("minPrice").value = "";
    if(document.getElementById("maxPrice")) document.getElementById("maxPrice").value = "";
    render();
  });

  // Drawer de filtros mobile
  const drawer = document.getElementById("filterDrawer");
  const overlay = document.getElementById("filterDrawerOverlay");
  document.getElementById("openFilterDrawer")?.addEventListener("click", () => {
    drawer?.classList.add("is-open");
    overlay?.classList.add("is-open");
  });
  document.querySelectorAll("[data-close-filter-drawer]").forEach(btn => {
    btn.addEventListener("click", () => {
      drawer?.classList.remove("is-open");
      overlay?.classList.remove("is-open");
    });
  });

  render();
});
