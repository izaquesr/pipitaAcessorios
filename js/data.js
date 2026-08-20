/* ============================================
   PIPITA — FONTE DE DADOS (produtos, categorias, coleções)
   Ao migrar para a Nuvemshop: substituir PRODUCTS pelos dados
   reais vindos da API/Liquid. A forma dos objetos (campos)
   deve ser mantida para não quebrar o restante do front-end.
   ============================================ */

/* Pool de imagens estável (Unsplash) + fallback local caso alguma falhe */
const IMG = "https://images.unsplash.com/";
const POOL = [
  IMG+"photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80",
  IMG+"photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=80",
  IMG+"photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80",
  IMG+"photo-1603561596112-0a132b757442?auto=format&fit=crop&w=900&q=80",
  IMG+"photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80",
  IMG+"photo-1518544866330-4d5a3b8fb8b1?auto=format&fit=crop&w=900&q=80",
  IMG+"photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=80",
  IMG+"photo-1584302179602-e4c3d3fd629d?auto=format&fit=crop&w=900&q=80",
  IMG+"photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=900&q=80",
  IMG+"photo-1603974372039-adc49044b6bd?auto=format&fit=crop&w=900&q=80",
  IMG+"photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=900&q=80",
  IMG+"photo-1622398925373-3f91b1e275f5?auto=format&fit=crop&w=900&q=80",
  IMG+"photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=900&q=80",
  IMG+"photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80",
  IMG+"photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=80",
  IMG+"photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=900&q=80",
  IMG+"photo-1585123334904-845d60e97b29?auto=format&fit=crop&w=900&q=80",
  IMG+"photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=80&sat=-20",
];

/* Placeholder local (SVG data-URI) usado quando uma imagem falha ao carregar */
function imgFallback(label){
  const txt = encodeURIComponent(label || "Pipita");
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='900' height='1100'>
    <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0' stop-color='%23F0E7D8'/><stop offset='1' stop-color='%23E3D5BD'/>
    </linearGradient></defs>
    <rect width='900' height='1100' fill='url(%23g)'/>
    <text x='50%25' y='50%25' font-family='Georgia,serif' font-size='38' fill='%238F6E38' text-anchor='middle' dominant-baseline='middle'>${txt}</text>
  </svg>`;
  return `data:image/svg+xml,${svg}`;
}
function handleImgError(img){
  if(img.dataset.fallbackApplied) return;
  img.dataset.fallbackApplied = "1";
  img.src = imgFallback(img.alt || "Pipita");
}
function imgTag(src, alt, cls, extra){
  return `<img src="${src}" alt="${alt}" class="${cls||""}" loading="lazy" onerror="handleImgError(this)" ${extra||""}>`;
}

/* Metadados de categorias / gêneros / coleções para navegação e filtros */
const GENDERS = [
  { slug:"feminino", label:"Feminino" },
  { slug:"masculino", label:"Masculino" }
];
const CATEGORIES = [
  { slug:"colares", label:"Colares" },
  { slug:"aneis", label:"Anéis" },
  { slug:"brincos", label:"Brincos" },
  { slug:"pulseiras", label:"Pulseiras" },
  { slug:"relogios", label:"Relógios" }
];
const COLLECTIONS = [
  { slug:"essenciais-dourados", label:"Essenciais Dourados", cover: POOL[0] },
  { slug:"prata-moderna", label:"Prata Moderna", cover: POOL[3] },
  { slug:"boho-verao", label:"Boho Verão", cover: POOL[7] },
  { slug:"signature-masculina", label:"Signature Masculina", cover: POOL[14] },
  { slug:"noiva", label:"Noiva & Ocasião", cover: POOL[9] }
];

const COLOR_HEX = {
  "Dourado":"#C9A227","Prateado":"#B8BEC4","Rosé":"#D9A7A0","Preto":"#2B2420",
  "Prata":"#C7CBCE","Aço":"#8C9199","Couro Marrom":"#6B4A34","Couro Preto":"#2A2320"
};

let _id = 1;
function P(o){
  const p = Object.assign({
    id:_id++, gender:"feminino", collections:[], sizes:[], colors:["Dourado"],
    oldPrice:null, badge:null, featured:false, stock:12, rating:4.7, reviews:24,
    details:["Peça folheada, resistente ao uso diário","Acompanha saquinho para presente","Garantia de 90 dias contra defeitos de fabricação"]
  }, o);
  p.slug = p.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");
  if(!p.images) p.images = [POOL[o._i%POOL.length], POOL[(o._i+1)%POOL.length], POOL[(o._i+2)%POOL.length], POOL[(o._i+3)%POOL.length]];
  return p;
}

const PRODUCTS = [
  // ---------- FEMININO · COLARES ----------
  P({_i:0, name:"Colar Aurora", category:"colares", gender:"feminino", price:189.90, oldPrice:249.90,
    description:"Colar delicado em banho de ouro 18k com pingente de zircônia lapidada à mão. Peça leve, atemporal e feita para brilhar no dia a dia.",
    colors:["Dourado","Prateado"], badge:"Mais vendido", featured:true, rating:4.8, reviews:63, collections:["essenciais-dourados"]}),
  P({_i:1, name:"Colar Veneza", category:"colares", gender:"feminino", price:159.90,
    description:"Corrente veneziana fina com fecho reforçado, perfeita para uso sozinha ou em camadas com outros colares.",
    colors:["Dourado","Prateado"], badge:"Novo", rating:4.6, reviews:19, collections:["essenciais-dourados"]}),
  P({_i:2, name:"Colar Gota de Luz", category:"colares", gender:"feminino", price:214.90, oldPrice:269.90,
    description:"Pingente em gota com zircônias cravejadas, capturando luz de todos os ângulos. O toque de brilho que qualquer look pede.",
    colors:["Dourado","Rosé"], badge:"Oferta", featured:true, rating:4.9, reviews:52, collections:["noiva"]}),
  P({_i:3, name:"Colar Camadas Duo", category:"colares", gender:"feminino", price:179.90,
    description:"Duas correntes em alturas diferentes, já vêm conectadas — o efeito 'layering' pronto, sem complicação.",
    colors:["Dourado"], rating:4.5, reviews:11, collections:["boho-verao"]}),

  // ---------- FEMININO · ANÉIS ----------
  P({_i:4, name:"Anel Lune", category:"aneis", gender:"feminino", price:129.90,
    description:"Anel minimalista com design fino e acabamento espelhado. Ideal para uso sobreposto com outras peças.",
    sizes:["14","16","18","20"], colors:["Dourado"], badge:"Novo", featured:true, rating:4.6, reviews:31, collections:["essenciais-dourados"]}),
  P({_i:5, name:"Anel Eterna", category:"aneis", gender:"feminino", price:149.90, oldPrice:189.90,
    description:"Aliança fina cravejada com micro zircônias em todo o entorno — clássica, discreta e para o dia a dia.",
    sizes:["14","16","18","20","22"], colors:["Dourado","Prateado"], badge:"Oferta", rating:4.7, reviews:38, collections:["noiva"]}),
  P({_i:6, name:"Anel Duo Torção", category:"aneis", gender:"feminino", price:119.90,
    description:"Design trançado em duas texturas, para empilhar com outros anéis ou usar sozinho.",
    sizes:["14","16","18","20"], colors:["Dourado","Rosé"], rating:4.4, reviews:9, collections:["boho-verao"]}),
  P({_i:7, name:"Anel Solitário Zircônia", category:"aneis", gender:"feminino", price:169.90,
    description:"Pedra central em zircônia lapidação brilhante, engaste em quatro garras — elegância clássica de solitário.",
    sizes:["14","16","18","20"], colors:["Prateado","Dourado"], featured:true, rating:4.9, reviews:47, collections:["noiva"]}),

  // ---------- FEMININO · BRINCOS ----------
  P({_i:8, name:"Brinco Petit Gota", category:"brincos", gender:"feminino", price:99.90, oldPrice:139.90,
    description:"Brinco em formato de gota com micro cravação, leve para uso prolongado sem pesar na orelha.",
    colors:["Dourado","Prateado"], badge:"Oferta", featured:true, rating:4.9, reviews:87, collections:["essenciais-dourados"]}),
  P({_i:9, name:"Brinco Argola Lisa", category:"brincos", gender:"feminino", price:89.90,
    description:"Argola média em acabamento liso e fecho de pressão seguro — o básico que nunca sai de moda.",
    colors:["Dourado","Prateado","Preto"], rating:4.5, reviews:22}),
  P({_i:10, name:"Brinco Cascata", category:"brincos", gender:"feminino", price:139.90,
    description:"Brinco longo em cascata de correntes, para dar movimento a looks de festa ou noite.",
    colors:["Dourado"], badge:"Novo", rating:4.7, reviews:14, collections:["noiva"]}),
  P({_i:11, name:"Brinco Botão Pérola", category:"brincos", gender:"feminino", price:79.90,
    description:"Clássico brinco botão com pérola sintética premium, acabamento nacarado que combina com tudo.",
    colors:["Dourado","Prateado"], rating:4.6, reviews:29}),

  // ---------- FEMININO · PULSEIRAS ----------
  P({_i:12, name:"Pulseira Riviera", category:"pulseiras", gender:"feminino", price:159.90,
    description:"Pulseira em elos finos entrelaçados, com fecho reforçado e ajuste de tamanho.",
    colors:["Dourado"], badge:"Mais vendido", featured:true, rating:4.7, reviews:44, collections:["essenciais-dourados"]}),
  P({_i:13, name:"Pulseira Elos Cubanos", category:"pulseiras", gender:"feminino", price:169.90,
    description:"Elos cubanos compactos em banho de ouro espesso, resistência e brilho no mesmo desenho.",
    colors:["Dourado","Prateado"], rating:4.6, reviews:16}),
  P({_i:14, name:"Pulseira Charme", category:"pulseiras", gender:"feminino", price:134.90,
    description:"Pulseira com pingentes charms removíveis — estrela, coração e lua — para compor do seu jeito.",
    colors:["Dourado","Rosé"], badge:"Novo", rating:4.8, reviews:21, collections:["boho-verao"]}),

  // ---------- FEMININO · RELÓGIOS ----------
  P({_i:15, name:"Relógio Elegance Feminino", category:"relogios", gender:"feminino", price:349.90, oldPrice:429.90,
    description:"Caixa fina em aço dourado, pulseira de elos ajustável e mostrador madrepérola. Sofisticação para o dia a dia ou eventos.",
    colors:["Dourado","Prateado"], badge:"Oferta", featured:true, rating:4.8, reviews:33, collections:["essenciais-dourados"]}),
  P({_i:16, name:"Relógio Vintage Couro", category:"relogios", gender:"feminino", price:279.90,
    description:"Pulseira em couro legítimo e caixa slim com números romanos — inspiração vintage com conforto atual.",
    colors:["Couro Marrom","Couro Preto"], rating:4.5, reviews:12},),

  // ---------- MASCULINO · COLARES ----------
  P({_i:17, name:"Corrente Cubana Masculina", category:"colares", gender:"masculino", price:249.90, oldPrice:299.90,
    description:"Corrente em elos cubanos robustos, banho de ouro espesso e fecho de segurança reforçado — presença sem exagero.",
    colors:["Dourado","Prateado"], badge:"Mais vendido", featured:true, rating:4.8, reviews:41, collections:["signature-masculina"]}),
  P({_i:18, name:"Colar Couro Pingente", category:"colares", gender:"masculino", price:129.90,
    description:"Cordão em couro trançado com pingente em aço escovado, discreto e versátil para o uso diário.",
    colors:["Couro Preto","Couro Marrom"], rating:4.4, reviews:8, collections:["signature-masculina"]}),

  // ---------- MASCULINO · ANÉIS ----------
  P({_i:19, name:"Anel Sinete Prata", category:"aneis", gender:"masculino", price:159.90,
    description:"Anel sinete em prata com acabamento escovado, design clássico que remete a brasões e selos.",
    sizes:["20","22","24","26"], colors:["Prata","Preto"], badge:"Novo", featured:true, rating:4.7, reviews:26, collections:["signature-masculina"]}),
  P({_i:20, name:"Anel Aço Escovado", category:"aneis", gender:"masculino", price:99.90,
    description:"Aço inoxidável hipoalergênico com acabamento fosco escovado — resistente à água e ao dia a dia.",
    sizes:["20","22","24","26","28"], colors:["Aço","Preto"], rating:4.6, reviews:19},),

  // ---------- MASCULINO · PULSEIRAS ----------
  P({_i:21, name:"Pulseira Couro Trançado", category:"pulseiras", gender:"masculino", price:89.90,
    description:"Trançado artesanal em couro legítimo com fecho magnético em aço — fácil de colocar e tirar.",
    colors:["Couro Preto","Couro Marrom"], rating:4.5, reviews:23, collections:["signature-masculina"]}),
  P({_i:22, name:"Bracelete Aço Milanês", category:"pulseiras", gender:"masculino", price:139.90, oldPrice:179.90,
    description:"Malha milanesa em aço inoxidável, ajuste deslizante e acabamento espelhado — elegância industrial.",
    colors:["Prata","Preto"], badge:"Oferta", rating:4.6, reviews:17}),
  P({_i:23, name:"Pulseira Missanga Surf", category:"pulseiras", gender:"masculino", price:49.90,
    description:"Trançado náutico ajustável em cordão encerado — despojada, perfeita para compor com relógio ou pulseiras de couro.",
    colors:["Preto","Couro Marrom"], badge:"Novo", rating:4.3, reviews:7, collections:["boho-verao"]}),

  // ---------- MASCULINO · RELÓGIOS ----------
  P({_i:24, name:"Relógio Classic Masculino", category:"relogios", gender:"masculino", price:389.90,
    description:"Caixa em aço 42mm, pulseira de couro italiano e mostrador minimalista — o clássico atemporal.",
    colors:["Couro Preto","Couro Marrom"], featured:true, rating:4.8, reviews:36, collections:["signature-masculina"]}),
  P({_i:25, name:"Relógio Esportivo Aço", category:"relogios", gender:"masculino", price:329.90, oldPrice:399.90,
    description:"Resistente à água, pulseira em malha de aço e visor com cronógrafo funcional — para o ritmo do dia a dia.",
    colors:["Prata","Preto"], badge:"Oferta", rating:4.6, reviews:28}),
];

/* ---------- Helpers de consulta ---------- */
function getProductBySlug(slug){ return PRODUCTS.find(p => p.slug === slug); }
function getProductById(id){ return PRODUCTS.find(p => p.id === Number(id)); }
function getCategoryLabel(slug){ return (CATEGORIES.find(c=>c.slug===slug)||{}).label || slug; }
function getGenderLabel(slug){ return (GENDERS.find(g=>g.slug===slug)||{}).label || slug; }
function getCollectionLabel(slug){ return (COLLECTIONS.find(c=>c.slug===slug)||{}).label || slug; }

function filterProducts({gender, category, collection, search, minPrice, maxPrice} = {}){
  return PRODUCTS.filter(p => {
    if(gender && p.gender !== gender) return false;
    if(category && p.category !== category) return false;
    if(collection && !p.collections.includes(collection)) return false;
    if(minPrice != null && p.price < minPrice) return false;
    if(maxPrice != null && p.price > maxPrice) return false;
    if(search){
      const q = search.toLowerCase();
      if(!p.name.toLowerCase().includes(q) && !p.category.toLowerCase().includes(q) && !p.description.toLowerCase().includes(q)) return false;
    }
    return true;
  });
}
function sortProducts(list, sortKey){
  const arr = [...list];
  switch(sortKey){
    case "price-asc": return arr.sort((a,b)=>a.price-b.price);
    case "price-desc": return arr.sort((a,b)=>b.price-a.price);
    case "rating": return arr.sort((a,b)=>b.rating-a.rating);
    case "newest": return arr.sort((a,b)=>b.id-a.id);
    default: return arr; /* relevância = ordem original */
  }
}
function relatedProducts(product, n=4){
  return PRODUCTS.filter(p => p.id !== product.id && (p.category === product.category || p.gender === product.gender))
    .sort((a,b)=> (b.category===product.category) - (a.category===product.category))
    .slice(0,n);
}
