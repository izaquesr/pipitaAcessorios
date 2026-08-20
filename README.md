# Pipita — Loja de Joias e Acessórios

Site refeito do zero como base para a loja **Pipita**, pronto para servir de
referência visual e funcional antes da adaptação para um tema **Nuvemshop**.

## O que foi feito nesta versão

- **Bug do carrinho corrigido na raiz.** No site anterior, o HTML do
  carrinho (e do menu mobile/busca) era duplicado em cada página, o que
  causava o comportamento errático de abrir sozinho e não fechar. Agora
  existe um único sistema de layout (`js/layout.js`) que injeta o cabeçalho,
  o menu mobile, o painel de busca e o carrinho **uma única vez por página**,
  sempre fechados por padrão, e só abrem ao clicar no ícone correspondente.
- **CRUD completo do carrinho** (`js/cart.js`): adicionar, editar quantidade
  (+/-), remover item **com mensagem de confirmação**, esvaziar carrinho,
  cupom de desconto e cálculo de frete grátis.
- **Favoritos** com CRUD simples (`js/favorites.js`), com página dedicada.
- **Categorias reorganizadas**: Feminino, Masculino, Joias (todas), Colares,
  Anéis, Brincos, Pulseiras, Relógios — além de 5 **Coleções** com página
  própria (`?view=colecoes`).
- **Cards de produto ao estilo Shein**: galeria de fotos que passa ao
  arrastar (mouse ou dedo), indicador de pontos, swatches de cor, e botões
  rápidos de **Adicionar ao carrinho**, **Comprar agora** e **Favoritar**.
- **Página de produto completa**: galeria com miniaturas e arraste,
  variações de cor e tamanho, quantidade, preço, parcelamento, descrição,
  detalhes em acordeão e produtos relacionados.
- **Busca** com painel dropdown no cabeçalho (sugestões ao digitar) e página
  de resultados dedicada.
- Todas as imagens têm um **fallback automático** (placeholder gerado via
  SVG) caso alguma URL do Unsplash não carregue — a loja nunca mostra um
  ícone de imagem quebrada.
- Totalmente responsivo (testado em telas mobile e desktop).

## Estrutura de arquivos

```
pipita/
├── index.html
├── pages/
│   ├── categoria.html      # listagem + filtros + coleções
│   ├── produto.html        # página de produto
│   ├── carrinho.html       # carrinho completo
│   ├── favoritos.html
│   ├── busca.html
│   ├── login.html
│   └── cadastro.html
├── css/
│   ├── global.css          # tokens de design (cores, tipografia, espaçamento)
│   ├── header.css
│   ├── home.css             # também contém o componente de card de produto
│   ├── category.css
│   ├── product.css
│   ├── cart.css
│   ├── account.css
│   └── responsive.css
└── js/
    ├── data.js              # catálogo de produtos, categorias e coleções
    ├── ui.js                # helpers de UI, card de produto, galeria com arraste
    ├── layout.js             # injeta cabeçalho / menu / busca / carrinho (uma vez só)
    ├── cart.js               # CRUD do carrinho + drawer + página do carrinho
    ├── favorites.js
    ├── search.js
    ├── category-page.js
    └── product-page.js
```

## Dados de demonstração

Os 26 produtos em `js/data.js` são fictícios, com fotos do Unsplash usadas
apenas como espaço reservado. Antes de publicar de verdade, troque por fotos
reais dos seus produtos.

## Migração para a Nuvemshop

Este projeto é HTML/CSS/JS estático (sem build step), o que facilita adaptar
para um tema Nuvemshop (Liquid):

1. **Produtos**: hoje vêm do array `PRODUCTS` em `js/data.js`. No tema
   Nuvemshop, essas mesmas seções (grid de produtos, card, página de
   produto) devem ser convertidas para os *loops* e *objetos* do Liquid da
   Nuvemshop (`product`, `category`, `collection`), mantendo a mesma
   estrutura de HTML/CSS já pronta.
2. **Carrinho**: hoje é local (localStorage) só para demonstração. Na
   Nuvemshop, o carrinho é gerenciado pela própria plataforma — as funções
   de `js/cart.js` (adicionar, remover, editar) devem ser substituídas pelas
   chamadas da API de carrinho da Nuvemshop, mas a interface visual (drawer,
   página de carrinho) pode ser reaproveitada quase sem alterações.
3. **Login/Conta**: as páginas `login.html`/`cadastro.html` são apenas
   protótipos visuais — a Nuvemshop tem seu próprio sistema de contas.
4. **Checkout**: o botão "Finalizar compra" hoje é uma simulação; na
   Nuvemshop ele deve apontar para o checkout nativo da plataforma.

## Como visualizar localmente

Basta abrir `index.html` em um navegador, ou rodar um servidor local:

```
python3 -m http.server 8000
```

e acessar `http://localhost:8000`.
