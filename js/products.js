/* ============================================
   PIPITA — PRODUCT DATA SOURCE
   Esta é a única fonte de dados de produtos do front-end.
   Ao migrar para a Nuvemshop, este arquivo deve ser
   substituído pelos dados retornados pela API/Liquid da loja
   (ex: {{ products }} ou fetch na API de produtos).
   A estrutura de PRODUCT_CARD / grids em ui.js NÃO deve mudar.
   ============================================ */

const IMG = "https://images.unsplash.com/";

const PRODUCTS = [
  {
    id: 1,
    name: "Colar Aurora",
    category: "Colares",
    gender: "Feminino",
    price: 189.90,
    oldPrice: 249.90,
    description: "Colar delicado em banho de ouro 18k com pingente de zircônia lapidada à mão. Peça leve, atemporal e feita para brilhar no dia a dia.",
    images: [IMG+"photo-1599643478518-a784e5dc4c8f?w=800&q=80", IMG+"photo-1611591437281-460bfbe1220a?w=800&q=80"],
    sizes: [],
    colors: ["Dourado","Prateado"],
    badge: "Mais vendido",
    featured: true,
    stock: 14,
    rating: 4.8,
    reviews: 63
  },
  {
    id: 2,
    name: "Anel Lune",
    category: "Anéis",
    gender: "Feminino",
    price: 129.90,
    oldPrice: null,
    description: "Anel minimalista com design fino e acabamento espelhado. Ideal para uso sobreposto com outras peças.",
    images: [IMG+"photo-1605100804763-247f67b3557e?w=800&q=80", IMG+"photo-1603561596112-0a132b757442?w=800&q=80"],
    sizes: ["14","16","18","20"],
    colors: ["Dourado"],
    badge: "Novo",
    featured: true,
    stock: 22,
    rating: 4.6,
    reviews: 31
  },
  {
    id: 3,
    name: "Brinco Petit Gota",
    category: "Brincos",
    gender: "Feminino",
    price: 99.90,
    oldPrice: 139.90,
    description: "Brinco em formato de gota com micro cravação, leve para uso prolongado sem pesar na orelha.",
    images: [IMG+"photo-1535632066927-ab7c9ab60908?w=800&q=80", IMG+"photo-1518544866330-4d5a3b8fb8b1?w=800&q=80"],
    sizes: [],
    colors: ["Dourado","Prateado"],
    badge: "Oferta",
    featured: true,
    stock: 9,
    rating: 4.9,
    reviews: 87
  },
  {
    id: 4,
    name: "Pulseira Riviera",
    category: "Pulseiras",
    gender: "Feminino",
    price: 159.90,
    oldPrice: null,
    description: "Pulseira em elos finos entrelaçados, com fecho reforçado e ajuste de tamanho.",
    images: [IMG+"photo-1611652022419-a9419f74343d?w=800&q=80", IMG+"photo-1584302179602-e4c3d3fd629d?w=800&q=80"],
    sizes: [],
    colors: ["Dourado"],
    badge: "Mais vendido",
    featured: true,
    stock: 17,
    rating: 4.7,
    reviews: 44
  },
  {
    id: 5,
    name: "Colar Ponto de Luz",
    category: "Colares",
    gender: "Feminino",
    price: 149.90,
    oldPrice: null,
    description: "Colar com pingente solitário, discreto e versátil para o dia a dia.",
    images: [IMG+"photo-1599643477877-530eb83abc8e?w=800&q=80", IMG+"photo-1573408301185-9146fe634ad0?w=800&q=80"],
    sizes: [],
    colors: ["Prateado","Dourado"],
    badge: "",
    featured: false,
    stock: 25,
    rating: 4.5,
    reviews: 19
  },
  {
    id: 6,
    name: "Anel Trio Stack",
    category: "Anéis",
    gender: "Feminino",
    price: 179.90,
    oldPrice: 219.90,
    description: "Conjunto de 3 anéis finos para combinar e empilhar, texturas variadas.",
    images: [IMG+"photo-1603974372039-adc49044b6bd?w=800&q=80", IMG+"photo-1611085583191-a3b181a88401?w=800&q=80"],
    sizes: ["14","16","18"],
    colors: ["Dourado"],
    badge: "Oferta",
    featured: false,
    stock: 11,
    rating: 4.4,
    reviews: 22
  },
  {
    id: 7,
    name: "Brinco Argola Clean",
    category: "Brincos",
    gender: "Feminino",
    price: 89.90,
    oldPrice: null,
    description: "Argola pequena de design clean, o essencial para qualquer produção.",
    images: [IMG+"photo-1573408301185-9146fe634ad0?w=800&q=80", IMG+"photo-1535632066927-ab7c9ab60908?w=800&q=80"],
    sizes: [],
    colors: ["Dourado","Prateado"],
    badge: "Novo",
    featured: false,
    stock: 30,
    rating: 4.6,
    reviews: 12
  },
  {
    id: 8,
    name: "Pulseira Charm Delicada",
    category: "Pulseiras",
    gender: "Feminino",
    price: 139.90,
    oldPrice: null,
    description: "Pulseira fina com pingente charm central, ajuste em três posições.",
    images: [IMG+"photo-1611591437281-460bfbe1220a?w=800&q=80", IMG+"photo-1599643478518-a784e5dc4c8f?w=800&q=80"],
    sizes: [],
    colors: ["Dourado"],
    badge: "",
    featured: false,
    stock: 8,
    rating: 4.3,
    reviews: 9
  },
  {
    id: 9,
    name: "Anel Signet Masculino",
    category: "Anéis",
    gender: "Masculino",
    price: 219.90,
    oldPrice: 259.90,
    description: "Anel signet em acabamento fosco, design robusto e atemporal.",
    images: [IMG+"photo-1622398925373-3f91b1e275f5?w=800&q=80", IMG+"photo-1605100804763-247f67b3557e?w=800&q=80"],
    sizes: ["18","20","22","24"],
    colors: ["Prateado","Preto"],
    badge: "Mais vendido",
    featured: true,
    stock: 13,
    rating: 4.8,
    reviews: 51
  },
  {
    id: 10,
    name: "Corrente Cartier Masculina",
    category: "Colares",
    gender: "Masculino",
    price: 249.90,
    oldPrice: null,
    description: "Corrente em elos grossos, acabamento espelhado, fecho de segurança.",
    images: [IMG+"photo-1611591437281-460bfbe1220a?w=800&q=80", IMG+"photo-1599643478518-a784e5dc4c8f?w=800&q=80"],
    sizes: [],
    colors: ["Prateado","Dourado"],
    badge: "Novo",
    featured: true,
    stock: 16,
    rating: 4.7,
    reviews: 28
  },
  {
    id: 11,
    name: "Pulseira Elos Grossos",
    category: "Pulseiras",
    gender: "Masculino",
    price: 189.90,
    oldPrice: 229.90,
    description: "Pulseira masculina de elos grossos, presença marcante no pulso.",
    images: [IMG+"photo-1611652022419-a9419f74343d?w=800&q=80", IMG+"photo-1584302179602-e4c3d3fd629d?w=800&q=80"],
    sizes: [],
    colors: ["Prateado"],
    badge: "Oferta",
    featured: false,
    stock: 6,
    rating: 4.5,
    reviews: 17
  },
  {
    id: 12,
    name: "Anel Liso Masculino",
    category: "Anéis",
    gender: "Masculino",
    price: 149.90,
    oldPrice: null,
    description: "Anel de aro liso e largo, ideal para uso diário.",
    images: [IMG+"photo-1603561596112-0a132b757442?w=800&q=80", IMG+"photo-1622398925373-3f91b1e275f5?w=800&q=80"],
    sizes: ["18","20","22"],
    colors: ["Preto","Prateado"],
    badge: "",
    featured: false,
    stock: 20,
    rating: 4.2,
    reviews: 6
  },
  {
    id: 13,
    name: "Colar Choker Veludo",
    category: "Colares",
    gender: "Feminino",
    price: 119.90,
    oldPrice: null,
    description: "Choker com fita de veludo e pingente central em metal dourado.",
    images: [IMG+"photo-1573408301185-9146fe634ad0?w=800&q=80", IMG+"photo-1599643477877-530eb83abc8e?w=800&q=80"],
    sizes: [],
    colors: ["Preto","Dourado"],
    badge: "Novo",
    featured: false,
    stock: 12,
    rating: 4.4,
    reviews: 8
  },
  {
    id: 14,
    name: "Brinco Ear Cuff Duo",
    category: "Brincos",
    gender: "Feminino",
    price: 79.90,
    oldPrice: 99.90,
    description: "Dupla de ear cuffs para compor looks modernos sem furar a orelha.",
    images: [IMG+"photo-1518544866330-4d5a3b8fb8b1?w=800&q=80", IMG+"photo-1535632066927-ab7c9ab60908?w=800&q=80"],
    sizes: [],
    colors: ["Dourado","Prateado"],
    badge: "Oferta",
    featured: false,
    stock: 19,
    rating: 4.6,
    reviews: 14
  },
  {
    id: 15,
    name: "Pulseira Pérolas Barrocas",
    category: "Pulseiras",
    gender: "Feminino",
    price: 169.90,
    oldPrice: null,
    description: "Pulseira com pérolas barrocas naturais e detalhes em metal dourado.",
    images: [IMG+"photo-1584302179602-e4c3d3fd629d?w=800&q=80", IMG+"photo-1611652022419-a9419f74343d?w=800&q=80"],
    sizes: [],
    colors: ["Dourado"],
    badge: "",
    featured: false,
    stock: 7,
    rating: 4.9,
    reviews: 33
  },
  {
    id: 16,
    name: "Colar Duplo Camadas Masculino",
    category: "Colares",
    gender: "Masculino",
    price: 199.90,
    oldPrice: 239.90,
    description: "Colar de duas camadas sobrepostas, combinação de elos finos e médios.",
    images: [IMG+"photo-1611085583191-a3b181a88401?w=800&q=80", IMG+"photo-1603974372039-adc49044b6bd?w=800&q=80"],
    sizes: [],
    colors: ["Prateado"],
    badge: "Oferta",
    featured: false,
    stock: 10,
    rating: 4.3,
    reviews: 11
  }
];

/* Helpers de acesso aos dados — usados por ui.js, filters.js e search.js */
function getProductById(id){
  return PRODUCTS.find(p => p.id === Number(id));
}
function getFeaturedProducts(limit = 4){
  return PRODUCTS.filter(p => p.featured).slice(0, limit);
}
function getProductsByCategory(category, gender){
  return PRODUCTS.filter(p =>
    (!category || p.category === category) &&
    (!gender || p.gender === gender)
  );
}
function getRelatedProducts(product, limit = 4){
  return PRODUCTS.filter(p => p.id !== product.id && p.category === product.category).slice(0, limit);
}
