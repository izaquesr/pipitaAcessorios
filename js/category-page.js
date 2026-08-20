/* ============================================
   PIPITA — PÁGINA DE CATEGORIA / LISTAGEM
   ============================================ */

function readCategoryParams(){
  const p = new URLSearchParams(location.search);
  return {
    gender: p.get("gender") || "",
    category: p.get("category") || "",
    collection: p.get("collection") || "",
    view: p.get("view") || "",
    sort: p.get("sort") || "relevance"
  };
}
function writeCategoryParams(next){
  const url = new URL(location.href);
  Object.entries(next).forEach(([k,v]) => {
    if(v) url.searchParams.set(k, v); else url.searchParams.delete(k);
  });
  history.pushState(null, "", url);
}

function pageTitleFor(state){
  if(state.view === "colecoes") return "Coleções";
  if(state.collection) return getCollectionLabel(state.collection);
  if(state.category && state.gender) return `${getCategoryLabel(state.category)} · ${getGenderLabel(state.gender)}`;
  if(state.category) return getCategoryLabel(state.category);
  if(state.gender) return getGenderLabel(state.gender);
  return "Todas as joias";
}

function renderFilterChips(state){
  const wrap = document.getElementById("filterChips");
  if(!wrap) return;
  const chip = (label, params, active) => `<button class="chip ${active?"is-active":""}" data-filter='${JSON.stringify(params)}'>${label}</button>`;
  wrap.innerHTML = [
    chip("Todos", {gender:"",category:"",collection:"",view:""}, !state.gender && !state.category && !state.collection && !state.view),
    ...GENDERS.map(g => chip(g.label, {gender:g.slug,category:"",collection:"",view:""}, state.gender===g.slug && !state.category)),
    ...CATEGORIES.map(c => chip(c.label, {category:c.slug,collection:"",view:""}, state.category===c.slug))
  ].join("");

  wrap.querySelectorAll("[data-filter]").forEach(btn => {
    btn.addEventListener("click", () => {
      const params = JSON.parse(btn.dataset.filter);
      writeCategoryParams({ ...params, sort: state.sort });
      boot();
    });
  });
}

function renderCollectionsIndex(){
  const grid = document.getElementById("collectionsGrid");
  document.getElementById("categoryListing").classList.add("is-hidden");
  grid.closest("section").classList.remove("is-hidden");
  grid.innerHTML = COLLECTIONS.map(c => `
    <a class="collection-card" href="${categoryLink({collection:c.slug})}">
      ${imgTag(c.cover, c.label, "collection-card-img")}
      <span class="collection-card-name">${c.label}</span>
    </a>`).join("");
}

function boot(){
  const state = readCategoryParams();
  document.getElementById("collectionsSection")?.classList.add("is-hidden");
  document.getElementById("categoryListing")?.classList.remove("is-hidden");

  if(state.view === "colecoes"){
    document.getElementById("categoryListing").classList.add("is-hidden");
    document.getElementById("collectionsSection").classList.remove("is-hidden");
    document.getElementById("pageTitle").textContent = "Coleções";
    document.getElementById("pageCrumb").textContent = "Coleções";
    document.getElementById("pageSubtitle").textContent = "Seleções especiais para cada momento.";
    renderCollectionsIndex();
    renderFilterChips(state);
    return;
  }

  document.getElementById("pageTitle").textContent = pageTitleFor(state);
  document.getElementById("pageCrumb").textContent = pageTitleFor(state);
  document.getElementById("pageSubtitle").textContent = "Peças selecionadas para você — filtre, compare e encontre a sua favorita.";

  let list = filterProducts({ gender: state.gender || null, category: state.category || null, collection: state.collection || null });
  list = sortProducts(list, state.sort);

  const grid = document.getElementById("categoryGrid");
  renderProductGrid(grid, list);
  document.getElementById("resultCount").textContent = `${list.length} produto${list.length!==1?"s":""}`;

  const sortSelect = document.getElementById("sortSelect");
  if(sortSelect) sortSelect.value = state.sort;

  renderFilterChips(state);
}

function initCategoryPage(){
  if(!document.getElementById("categoryGrid")) return;
  document.getElementById("sortSelect")?.addEventListener("change", (e) => {
    writeCategoryParams({ sort: e.target.value });
    boot();
  });
  window.addEventListener("popstate", boot);
  boot();
}
document.addEventListener("DOMContentLoaded", initCategoryPage);
