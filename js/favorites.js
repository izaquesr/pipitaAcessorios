/* ============================================
   PIPITA — FAVORITOS (localStorage)
   ============================================ */

const FAV_KEY = "pipita_favorites";

function getFavorites(){
  try{ return JSON.parse(localStorage.getItem(FAV_KEY)) || []; }
  catch{ return []; }
}
function saveFavorites(list){
  localStorage.setItem(FAV_KEY, JSON.stringify(list));
  updateFavCount();
}
function isFavorite(id){ return getFavorites().includes(id); }

function toggleFavorite(product, btnEl){
  let list = getFavorites();
  const active = list.includes(product.id);
  if(active){
    list = list.filter(id => id !== product.id);
    showToast(`"${product.name}" removido dos favoritos.`);
  }else{
    list.push(product.id);
    showToast(`"${product.name}" adicionado aos favoritos. ❤`);
  }
  saveFavorites(list);
  document.querySelectorAll(`[data-fav-toggle="${product.id}"]`).forEach(b => {
    b.classList.toggle("is-active", !active);
    b.setAttribute("aria-pressed", String(!active));
  });
  if(document.getElementById("favoritesGrid")) renderFavoritesPage();
}

function updateFavCount(){
  const count = getFavorites().length;
  document.querySelectorAll("[data-fav-count]").forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? "flex" : "none";
  });
}

function renderFavoritesPage(){
  const grid = document.getElementById("favoritesGrid");
  if(!grid) return;
  const ids = getFavorites();
  const products = ids.map(id => getProductById(id)).filter(Boolean);
  if(!products.length){
    grid.innerHTML = "";
    document.getElementById("favoritesEmpty")?.classList.remove("is-hidden");
    document.getElementById("favoritesCount")?.replaceChildren();
    return;
  }
  document.getElementById("favoritesEmpty")?.classList.add("is-hidden");
  const label = document.getElementById("favoritesCount");
  if(label) label.textContent = `${products.length} ite${products.length>1?"ns":"m"}`;
  renderProductGrid(grid, products);
}

document.addEventListener("DOMContentLoaded", () => {
  updateFavCount();
  renderFavoritesPage();
});
