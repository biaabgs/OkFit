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
  fetch("assets/js/data/treinos.json")
    .then(res => res.json())
    .then(data => {
      data.treinos.forEach(treino => {
        const id = treino.id;

        const img = document.getElementById(`img-${id}`);
        const titulo = document.getElementById(`titulo-${id}`);
        const desc = document.getElementById(`desc-${id}`);
        const card = document.getElementById(`card-${id}`);

        if (img) img.src = treino.imagem;
        if (titulo) titulo.textContent = treino.titulo;
        if (desc) desc.textContent = treino.descricao;
        if (card) {
          card.onclick = () => {
            window.location.href = `/treino?id=${id}&nome=${treino.nomeurl}`;
          };
        }
      });
    })
    .catch(error => console.error("Erro ao carregar treinos.json:", error));
});

document.addEventListener("DOMContentLoaded", () => { /* DOMContentLoaded --> espera o HTML ser executado para executar o JS */
  const params = new URLSearchParams(window.location.search); /* window.location.search --> recebe tudo que vem depois do ? (no caso ?id=${id}) */
  /* esse params relaciona o html especifico (treino.html) com o generalizado (treinos.html) pois recebe do URL o id */
  const treinoId = parseInt(params.get("id"));
  if (!treinoId) return;

  fetch("assets/js/data/treinos.json")
    .then(res => res.json())
    .then(data => {
      const treino = data.treinos.find(t => t.id === treinoId);
      if (!treino) return;

      const tituloElement = document.querySelector(".main-titulo");
      if (tituloElement) tituloElement.textContent = treino.titulo;
      treino.exercicios.forEach((ex, index) => {
        const nomeElemento = document.getElementById(`ex-nome-${index + 1}`); /* index + pois o index comeca em 0 */
        const descElemento = document.getElementById(`ex-desc-${index + 1}`);

        if (nomeElemento) nomeElemento.textContent = ex.nome;
        if (descElemento) descElemento.innerHTML = ex.descricao;
      });
    })
    .catch(err => console.error("Erro ao carregar treino:", err));
});

/* Titulo --> nome do TREINO (exemplo: Peito e Tríceps)
Nome --> nome do EXERCICIO (exemplo: )*/



