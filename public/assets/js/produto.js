function toggleTask(checkbox) {
  const taskCard = checkbox.closest(".task-card");
  if (checkbox.checked) {
    taskCard.classList.add("completed");
  } else {
    taskCard.classList.remove("completed");
  }
}

function deleteTask(button) {
  const colDiv = button.closest(".col-12");
  colDiv.style.opacity = "0";
  colDiv.style.transform = "translateX(-20px)";
  setTimeout(() => colDiv.remove(), 300);
}

document.addEventListener("DOMContentLoaded", () => {
  fetch("assets/js/data/produtos.json")
    .then(res => res.json())
    .then(data => {
      data.produto.forEach(produto => {
        const id = produto.id;

        const img = document.getElementById(`img-${id}`);
        const titulo = document.getElementById(`titulo-${id}`);
        const desc = document.getElementById(`desc-${id}`);
        const card = document.getElementById(`card-${id}`);

        if (img) img.src = produto.imagem;
        if (titulo) titulo.textContent = produto.titulo;
        if (desc) desc.textContent = produto.descricao;
        if (card) {
          card.onclick = () => {
            window.location.href = `/produto?id=${id}&nome=${produto.nomeurl}`;
          };
        }
      });
    })
    .catch(error => console.error("Erro ao carregar produto.json:", error));
});

document.addEventListener("DOMContentLoaded", () => { /* DOMContentLoaded --> espera o HTML ser executado para executar o JS */
  const params = new URLSearchParams(window.location.search); /* window.location.search --> recebe tudo que vem depois do ? (no caso ?id=${id}) */
  /* esse params relaciona o html especifico (treino.html) com o generalizado (treinos.html) pois recebe do URL o id */
  const produtoId = parseInt(params.get("id"));
  if (!produtoId) return;

  fetch("assets/js/data/produto.json")
    .then(res => res.json())
    .then(data => {
      const produto = data.produto.find(t => t.id === produtoId);
      if (!poduto) return;

      const tituloElement = document.querySelector(".main-titulo");
      if (tituloElement) tituloElement.textContent = produto.titulo;
      produto.exercicios.forEach((ex, index) => {
        const nomeElemento = document.getElementById(`ex-nome-${index + 1}`); /* index + pois o index comeca em 0 */
        const descElemento = document.getElementById(`ex-desc-${index + 1}`);

        if (nomeElemento) nomeElemento.textContent = ex.nome;
        if (descElemento) descElemento.innerHTML = ex.descricao;
      });
    })
    .catch(err => console.error("Erro ao carregar produto:", err));
});

/* Titulo --> nome do TREINO (exemplo: Peito e Tríceps)
Nome --> nome do EXERCICIO (exemplo: )*/



