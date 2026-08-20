/* ============================================
   PIPITA — BUSCA
   ============================================ */

function renderLiveSearch(query){
  const box = document.getElementById("searchResults");
  if(!box) return;
  const q = query.trim();
  if(!q){ box.innerHTML = ""; box.classList.remove("has-results"); return; }
  const results = filterProducts({ search: q }).slice(0, 6);
  box.classList.add("has-results");
  if(!results.length){
    box.innerHTML = `<p class="search-empty">Nenhum resultado para "${q}". <a href="${rootPath()}pages/busca.html?q=${encodeURIComponent(q)}">Ver todos os resultados</a></p>`;
    return;
  }
  box.innerHTML = `
    <ul class="search-suggest-list">
      ${results.map(p => `
        <li><a href="${productLink(p)}">
          ${imgTag(p.images[0], p.name, "", 'width="48" height="56"')}
          <span><strong>${p.name}</strong><em>${formatPrice(p.price)}</em></span>
        </a></li>`).join("")}
    </ul>
    <a class="link-arrow" href="${rootPath()}pages/busca.html?q=${encodeURIComponent(q)}">Ver todos os resultados para "${q}"</a>
  `;
}

function initSearchPage(){
  const grid = document.getElementById("searchGrid");
  if(!grid) return;
  const params = new URLSearchParams(location.search);
  const q = params.get("q") || "";
  const input = document.getElementById("searchPageInput");
  const title = document.getElementById("searchPageTitle");
  if(input) input.value = q;

  function run(query){
    const results = filterProducts({ search: query });
    if(title) title.textContent = query ? `Resultados para "${query}"` : "Digite algo para buscar";
    const countEl = document.getElementById("searchResultCount");
    if(countEl) countEl.textContent = query ? `${results.length} produto${results.length!==1?"s":""} encontrado${results.length!==1?"s":""}` : "";
    renderProductGrid(grid, query ? results : []);
  }
  run(q);
  input?.addEventListener("input", () => {
    const val = input.value.trim();
    const url = new URL(location.href);
    if(val) url.searchParams.set("q", val); else url.searchParams.delete("q");
    history.replaceState(null, "", url);
    run(val);
  });
}
document.addEventListener("DOMContentLoaded", initSearchPage);
