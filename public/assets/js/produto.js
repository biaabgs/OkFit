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

        // Preenche os dados do card
        if (img) img.src = produto.imagem;
        if (titulo) titulo.textContent = produto.titulo;
        if (desc) desc.textContent = produto.descricao;
        
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
  // Pega os parâmetros da URL (?id=1&nome=whey-protein-concentrado)
  const params = new URLSearchParams(window.location.search);
  const produtoId = parseInt(params.get("id"));
  
  // Se não houver ID na URL, não faz nada (não está na página de detalhes)
  if (!produtoId) return;

  fetch("assets/js/data/produtos.json")
    .then(res => res.json())
    .then(data => {
      // Encontra o produto específico pelo ID
      const produto = data.produtos.find(p => p.id === produtoId);
      
      // Se não encontrar o produto, não faz nada
      if (!produto) {
        console.error("Produto não encontrado!");
        return;
      }

      // Atualiza título principal da página
      const tituloElement = document.querySelector(".main-titulo");
      if (tituloElement) tituloElement.textContent = produto.titulo;

      // Atualiza imagem do produto
      const imagemElement = document.querySelector(".produto-imagem");
      if (imagemElement) {
        imagemElement.src = produto.imagem;
        imagemElement.alt = produto.titulo;
      }

      // Atualiza descrição
      const descElement = document.querySelector(".produto-descricao");
      if (descElement) descElement.textContent = produto.descricao;

      // Atualiza detalhes do produto (se existirem no HTML)
      const detalhes = produto.detalhes;
      if (detalhes) {
        const marcaEl = document.getElementById("produto-marca");
        const tipoEl = document.getElementById("produto-tipo");
        const pesoEl = document.getElementById("produto-peso");
        const porcaoEl = document.getElementById("produto-porcao");
        const precoEl = document.getElementById("produto-preco");

        if (marcaEl) marcaEl.textContent = detalhes.marca;
        if (tipoEl) tipoEl.textContent = detalhes.tipo;
        if (pesoEl) pesoEl.textContent = detalhes.peso;
        if (porcaoEl) porcaoEl.textContent = detalhes.porcao;
        if (precoEl) precoEl.textContent = detalhes.preco_sugerido;

        // Se o produto tiver proteína por porção
        if (detalhes.proteina_por_porco) {
          const proteinaEl = document.getElementById("produto-proteina");
          if (proteinaEl) proteinaEl.textContent = detalhes.proteina_por_porco;
        }

        // Se o produto tiver creatina por porção
        if (detalhes.creatina_por_porco) {
          const creatinaEl = document.getElementById("produto-creatina");
          if (creatinaEl) creatinaEl.textContent = detalhes.creatina_por_porco;
        }

        // Lista de sabores disponíveis
        if (detalhes.sabores_disponiveis) {
          const saboresEl = document.getElementById("produto-sabores");
          if (saboresEl) {
            saboresEl.textContent = detalhes.sabores_disponiveis.join(", ");
          }
        }
      }

      // Atualiza modo de uso
      const usoEl = document.querySelector(".produto-uso");
      if (usoEl) usoEl.textContent = produto.uso;

      // Atualiza dicas
      const dicaEl = document.querySelector(".produto-dica");
      if (dicaEl) dicaEl.textContent = produto.dica;
    })
    .catch(err => console.error("Erro ao carregar produto:", err));
});
