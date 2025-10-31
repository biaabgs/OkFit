// //===== CATÁLOGO DE PRODUTOS =====
// //Carrega e exibe produtos na página de catálogo
// document.addEventListener("DOMContentLoaded", () => {
//   fetch("assets/js/data/produtos.json")
//     .then(res => res.json())
//     .then(data => {
//       // Usa "produtos" (plural) conforme o JSON fornecido
//       data.produtos.forEach(produto => {
//         const id = produto.id;

//         // Busca elementos do card pelo ID
//         const img = document.getElementById(`img-${id}`);
//         const titulo = document.getElementById(`titulo-${id}`);
//         const desc = document.getElementById(`desc-${id}`);
//         const card = document.getElementById(`card-${id}`);
//         const preco = document.getElementById(`preco-${id}`);
//         const pontos = document.getElementById(`pontos-${id}`);

//         // Preenche os dados do card
//         if (img) img.src = produto.imagem;
//         if (titulo) titulo.textContent = produto.titulo;
//         if (desc) desc.textContent = produto.descricao;
//         if (preco) preco.textContent = produto.preco;
//         if (pontos) pontos.textContent = produto.pontos;

//         // Adiciona evento de clique para navegar até a página de detalhes
//         if (card) {
//           card.onclick = () => {
//             window.location.href = `produto.html?id=${id}&nome=${produto.nomeurl}`;
//           };
//         }
//       });
//     })
//     .catch(error => console.error("Erro ao carregar produtos.json:", error));
// });


// // ===== PÁGINA DE DETALHES DO PRODUTO =====
// // Carrega informações específicas de um produto individual
// document.addEventListener("DOMContentLoaded", () => {
//   const params = new URLSearchParams(window.location.search);
//   const produtoId = parseInt(params.get("id"));

//   if (!produtoId) return;

//   fetch("assets/js/data/produtos.json")
//     .then(res => res.json())
//     .then(data => {
//       const produto = data.produtos.find(p => p.id === produtoId);
//       if (!produto) {
//         console.error("Produto não encontrado!");
//         return;
//       }

//       // Atualiza título principal
//       const tituloElement = document.querySelector(".main-titulo");
//       if (tituloElement) tituloElement.textContent = produto.titulo;

//       // Atualiza imagem principal
//       const imagemElement = document.querySelector(".produto-imagem");
//       if (imagemElement) {
//         imagemElement.src = produto.imagem;
//         imagemElement.alt = produto.titulo;
//       }

//       // Atualiza descrição
//       const descElement = document.querySelector(".produto-descricao");
//       if (descElement) descElement.textContent = produto.descricao;

//       // Atualiza detalhes
//       const detalhes = produto.detalhes;
//       if (detalhes) {
//         const marcaEl = document.getElementById("produto-marca");
//         const tipoEl = document.getElementById("produto-tipo");
//         const pesoEl = document.getElementById("produto-peso");
//         const porcaoEl = document.getElementById("produto-porcao");
//         const precoEl = document.getElementById("produto-preco");
//         const pontosEl = document.getElementById("produto-pontos");

//         if (marcaEl) marcaEl.textContent = detalhes.marca;
//         if (tipoEl) tipoEl.textContent = detalhes.tipo;
//         if (pesoEl) pesoEl.textContent = detalhes.peso;
//         if (porcaoEl) porcaoEl.textContent = detalhes.porcao;
//         if (precoEl) precoEl.textContent = detalhes.preco_sugerido;
//         if (pontosEl) pontosEl.textContent = detalhes.pontos_sugerido;

//         if (detalhes.proteina_por_porco) {
//           const proteinaEl = document.getElementById("produto-proteina");
//           if (proteinaEl) proteinaEl.textContent = detalhes.proteina_por_porco;
//         }

//         if (detalhes.creatina_por_porco) {
//           const creatinaEl = document.getElementById("produto-creatina");
//           if (creatinaEl) creatinaEl.textContent = detalhes.creatina_por_porco;
//         }

//         // Preenche sabores
//         const selectSabores = document.getElementById("produto-sabores-select");
//         if (selectSabores) {
//           selectSabores.innerHTML = '<option value="">Selecione o sabor</option>';
//           detalhes.sabores_disponiveis.forEach(sabor => {
//             const valor = sabor.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');
//             const option = document.createElement("option");
//             option.value = valor;
//             option.textContent = sabor;
//             selectSabores.appendChild(option);
//           });
//         }
//       }

//       // Atualiza modo de uso
//       const usoEl = document.querySelector(".produto-uso");
//       if (usoEl) usoEl.textContent = produto.uso;

//       // Atualiza dica
//       const dicaEl = document.querySelector(".produto-dica");
//       if (dicaEl) dicaEl.textContent = produto.dica;

//       // Mapeamento de imagens por sabor
//       const imagensPorSabor = {
//         baunilha: {
//           whey: "assets/img/suplementos/whey_baunilha.png",
//           barrinha: "assets/img/barrinha/barrinha_azul.png"
//         },
//         chocolate: {
//           whey: "assets/img/suplementos/whey_chocolate.png",
//           barrinha: "assets/img/barrinha/barrinha_laranja.png"
//         },
//         laranja: { whey: "assets/img/suplementos/whey_laranja.png" },
//         limao: { whey: "assets/img/suplementos/whey_limao.png" },
//         uva: { whey: "assets/img/suplementos/whey_uva.png" },
//         morango: { whey: "assets/img/suplementos/whey_morango.png" },
//         cookies: { whey: "assets/img/suplementos/whey_cookies.png" }
//       };

//       // Troca imagem conforme sabor
//       const selectSabores = document.getElementById("produto-sabores-select");
//       const imagemProduto = document.querySelector(".produto-imagem");

//       if (selectSabores && imagemProduto) {
//         selectSabores.addEventListener("change", () => {
//           const saborSelecionado = selectSabores.value;
//           const tipoProduto = produto.detalhes.tipo.toLowerCase().includes("barrinha") ? "barrinha" : "whey";

//           if (saborSelecionado === "" || !imagensPorSabor[saborSelecionado] || !imagensPorSabor[saborSelecionado][tipoProduto]) {
//             // Volta à imagem original do produto
//             imagemProduto.src = produto.imagem;
//             imagemProduto.alt = produto.titulo;
//           } else {
//             // Atualiza para imagem do sabor
//             imagemProduto.src = imagensPorSabor[saborSelecionado][tipoProduto];
//             imagemProduto.alt = `Sabor ${saborSelecionado}`;
//           }

//         });

//       }
//     })
//     .catch(err => console.error("Erro ao carregar produto:", err));
// });

//===== CATÁLOGO DE PRODUTOS =====
//Carrega e exibe produtos na página de catálogo
document.addEventListener("DOMContentLoaded", () => {
  fetch("assets/js/data/produtos.json")
    .then(res => res.json())
    .then(data => {
      // Usa "produtos" (plural) conforme o JSON fornecido
      data.produtos.forEach(produto => {
        const id = produto.id;

        // Busca elementos do card pelo ID
        const img = document.getElementById(`img-${id}`);
        const titulo = document.getElementById(`titulo-${id}`);
        const desc = document.getElementById(`desc-${id}`);
        const card = document.getElementById(`card-${id}`);
        const preco = document.getElementById(`preco-${id}`);
        const pontos = document.getElementById(`pontos-${id}`);

        // Preenche os dados do card
        if (img) img.src = produto.imagem;
        if (titulo) titulo.textContent = produto.titulo;
        if (desc) desc.textContent = produto.descricao;
        if (preco) preco.textContent = produto.preco;
        if (pontos) pontos.textContent = produto.pontos;

        // Adiciona evento de clique para navegar até a página de detalhes
        if (card) {
          card.onclick = () => {
            window.location.href = `produto.html?id=${id}&nome=${produto.nomeurl}`;
          };
        }
      });
    })
    .catch(error => console.error("Erro ao carregar produtos.json:", error));
});


// ===== PÁGINA DE DETALHES DO PRODUTO =====
// Carrega informações específicas de um produto individual
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const produtoId = parseInt(params.get("id"));

  if (!produtoId) return;

  fetch("assets/js/data/produtos.json")
    .then(res => res.json())
    .then(data => {
      const produto = data.produtos.find(p => p.id === produtoId);
      if (!produto) {
        console.error("Produto não encontrado!");
        return;
      }

      // Atualiza título principal
      const tituloElement = document.querySelector(".main-titulo");
      if (tituloElement) tituloElement.textContent = produto.titulo;

      // Atualiza imagem principal
      const imagemElement = document.querySelector(".produto-imagem");
      if (imagemElement) {
        imagemElement.src = produto.imagem;
        imagemElement.alt = produto.titulo;
      }

      // Atualiza descrição
      const descElement = document.querySelector(".produto-descricao");
      if (descElement) descElement.textContent = produto.descricao;

      // Atualiza detalhes
      const detalhes = produto.detalhes;
      if (detalhes) {
        const marcaEl = document.getElementById("produto-marca");
        const tipoEl = document.getElementById("produto-tipo");
        const pesoEl = document.getElementById("produto-peso");
        const porcaoEl = document.getElementById("produto-porcao");
        const precoEl = document.getElementById("produto-preco");
        const pontosEl = document.getElementById("produto-pontos");

        if (marcaEl) marcaEl.textContent = detalhes.marca;
        if (tipoEl) tipoEl.textContent = detalhes.tipo;
        if (pesoEl) pesoEl.textContent = detalhes.peso;
        if (porcaoEl) porcaoEl.textContent = detalhes.porcao;
        if (precoEl) precoEl.textContent = detalhes.preco_sugerido;
        if (pontosEl) pontosEl.textContent = detalhes.pontos_sugerido;

        if (detalhes.proteina_por_porco) {
          const proteinaEl = document.getElementById("produto-proteina");
          const proteinaInfo = document.getElementById("proteina-info");
          if (proteinaEl) proteinaEl.textContent = detalhes.proteina_por_porco;
          if (proteinaInfo) proteinaInfo.style.display = "block";
        }

        if (detalhes.creatina_por_porco) {
          const creatinaEl = document.getElementById("produto-creatina");
          const creatinaInfo = document.getElementById("creatina-info");
          if (creatinaEl) creatinaEl.textContent = detalhes.creatina_por_porco;
          if (creatinaInfo) creatinaInfo.style.display = "block";
        }

        // Preenche sabores
        const selectSabores = document.getElementById("produto-sabores-select");
        if (selectSabores && detalhes.sabores_disponiveis) {
          selectSabores.innerHTML = '<option value="">Selecione o sabor</option>';
          detalhes.sabores_disponiveis.forEach(sabor => {
            const valor = sabor.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');
            const option = document.createElement("option");
            option.value = valor;
            option.textContent = sabor;
            selectSabores.appendChild(option);
          });
        }
      }

      // Atualiza modo de uso
      const usoEl = document.querySelector(".produto-uso");
      if (usoEl) usoEl.textContent = produto.uso;

      // Atualiza dica
      const dicaEl = document.querySelector(".produto-dica");
      if (dicaEl) dicaEl.textContent = produto.dica;

      // Mapeamento de imagens por sabor
      const imagensPorSabor = {
        "baunilha": {
          whey: "assets/img/suplementos/whey_baunilha.png",
          barrinha: "assets/img/barrinha/barrinha_azul.png"
        },
        "chocolate": {
          whey: "assets/img/suplementos/whey_chocolate.png",
          barrinha: "assets/img/barrinha/barrinha_laranja.png"
        },
        "laranja": { 
          whey: "assets/img/suplementos/whey_laranja.png" 
        },
        "limao": { 
          whey: "assets/img/suplementos/whey_limao.png" 
        },
        "uva": { 
          whey: "assets/img/suplementos/whey_uva.png" 
        },
        "morango": { 
          whey: "assets/img/suplementos/whey_morango.png" 
        },
        "cookies": { 
          whey: "assets/img/suplementos/whey_cookies.png" 
        },
        "caramelo": {
          whey: "assets/img/suplementos/whey_caramelo.png"
        },
        "neutra": {
          creatina: "assets/img/suplementos/creatina.png"
        }
      };

      // Troca imagem conforme sabor
      const selectSabores = document.getElementById("produto-sabores-select");
      const imagemProduto = document.querySelector(".produto-imagem");

      if (selectSabores && imagemProduto) {
        selectSabores.addEventListener("change", () => {
          const saborSelecionado = selectSabores.value;
          
          // Detecta o tipo de produto
          let tipoProduto = "whey"; // padrão
          
          // Verifica se tem propriedade tipo no nível raiz
          if (produto.tipo === "barrinha") {
            tipoProduto = "barrinha";
          } else {
            // Senão, verifica pelo título
            const tituloLower = produto.titulo.toLowerCase();
            if (tituloLower.includes("barrinha") || tituloLower.includes("bar")) {
              tipoProduto = "barrinha";
            } else if (tituloLower.includes("creatina")) {
              tipoProduto = "creatina";
            } else if (tituloLower.includes("whey") || tituloLower.includes("protein")) {
              tipoProduto = "whey";
            }
          }

          console.log("Sabor selecionado:", saborSelecionado);
          console.log("Tipo de produto detectado:", tipoProduto);

          if (saborSelecionado === "") {
            // Volta à imagem original do produto
            imagemProduto.src = produto.imagem;
            imagemProduto.alt = produto.titulo;
          } else if (imagensPorSabor[saborSelecionado] && imagensPorSabor[saborSelecionado][tipoProduto]) {
            // Atualiza para imagem do sabor
            imagemProduto.src = imagensPorSabor[saborSelecionado][tipoProduto];
            imagemProduto.alt = `${produto.titulo} - Sabor ${saborSelecionado}`;
            console.log("Imagem atualizada para:", imagemProduto.src);
          } else {
            // Se não houver imagem específica, mantém a original
            console.warn(`Imagem não encontrada para: sabor=${saborSelecionado}, tipo=${tipoProduto}`);
            imagemProduto.src = produto.imagem;
            imagemProduto.alt = produto.titulo;
          }
        });
      }
    })
    .catch(err => console.error("Erro ao carregar produto:", err));
});