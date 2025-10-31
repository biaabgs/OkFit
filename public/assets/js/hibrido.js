// Seu JavaScript aqui
document.addEventListener("DOMContentLoaded", () => {
  fetch("assets/js/data/online.json")
    .then(res => res.json())
    .then(data => {
      data.cursos.forEach(curso => {
        const id = curso.id;

        const titulo = document.getElementById(`titulo-${id}`);
        const totalAulas = document.getElementById(`totalAulas-${id}`);
        const card = document.getElementById(`card-${id}`);

        if (titulo) titulo.textContent = curso.titulo;
        if (totalAulas) totalAulas.textContent = curso.totalAulas;
        if (card) {
          card.onclick = () => {
            window.location.href = `/treino_online.html?id=${id}&nome=${curso.nomeurl}`;
          };
        }
      });
    })
    .catch(error => console.error("Erro ao carregar online.json:", error));
});

document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const lessonList = document.getElementById('lessonList');
    const completeBtn = document.getElementById('completeBtn');
    const nextBtn = document.getElementById('nextBtn');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const lessonVideo = document.getElementById('lessonVideo');

    // State
    let currentLesson = 1;
    let totalLessons = 0;
    let completedLessons = new Set();
    let videoIds = {}; // ← Será preenchido dinamicamente
    let cursoAtual = null;

    // Pega o ID do curso da URL
    const params = new URLSearchParams(window.location.search);
    const onlineId = parseInt(params.get("id"));

    if (!onlineId) {
        console.error("ID do curso não encontrado");
        return;
    }

    // CARREGA OS DADOS DO JSON
    fetch("assets/js/data/online.json")
        .then(res => res.json())
        .then(data => {
            cursoAtual = data.cursos.find(c => c.id === onlineId);
            
            if (!cursoAtual) {
                console.error("Curso não encontrado");
                return;
            }

            // Define totais
            totalLessons = cursoAtual.aulas.length;

            // PREENCHE O OBJETO videoIds COM OS DADOS DO JSON
            cursoAtual.aulas.forEach((aula, index) => {
                videoIds[index + 1] = aula.videoId;
            });

            // Atualiza o título da página
            const tituloElement = document.querySelector(".main-titulo");
            if (tituloElement) {
                tituloElement.textContent = cursoAtual.titulo;
            }

            // Popula a lista de aulas
            popularListaAulas();

            // Inicializa
            updateProgress();
            updateLessonStates();
            updateVideo(currentLesson);
        })
        .catch(error => console.error("Erro ao carregar curso:", error));

    // Popula a lista de aulas no sidebar
    function popularListaAulas() {
        if (!lessonList || !cursoAtual) return;

        lessonList.innerHTML = ''; // Limpa a lista

        cursoAtual.aulas.forEach((aula, index) => {
            const lessonNum = index + 1;
            const li = document.createElement('li');
            li.className = 'lesson-item';
            li.dataset.lesson = lessonNum;
            li.innerHTML = `
                <span class="lesson-number">${lessonNum}</span>
                <span class="lesson-title">${aula.nome}</span>
            `;
            lessonList.appendChild(li);
        });
    }

    // Update video iframe
function updateVideo(lessonNumber) {
    const videoId = videoIds[lessonNumber];
    if (videoId) {
        // Limpa o videoId (remove parâmetros extras)
        const cleanVideoId = videoId.split('?')[0].split('&')[0];
        
        // Monta a URL do embed
        lessonVideo.src = `https://www.youtube.com/embed/${cleanVideoId}`;
        
        console.log('Carregando vídeo:', cleanVideoId);
    } else {
        console.error("Vídeo não encontrado para a aula:", lessonNumber);
        lessonVideo.src = ''; // Limpa o iframe
    }
}

    // Update progress bar
    function updateProgress() {
        const progress = (completedLessons.size / totalLessons) * 100;
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `${Math.round(progress)}% Completo`;
    }

    // Update lesson states in UI
    function updateLessonStates() {
        const lessons = lessonList.getElementsByClassName('lesson-item');
        
        Array.from(lessons).forEach((lesson, index) => {
            const lessonNum = index + 1;
            lesson.classList.remove('completed', 'active');

            if (completedLessons.has(lessonNum)) {
                lesson.classList.add('completed');
            }
            
            if (lessonNum === currentLesson) {
                lesson.classList.add('active');
            }
        });

        const isCurrentCompleted = completedLessons.has(currentLesson);
        completeBtn.disabled = isCurrentCompleted;
        completeBtn.textContent = isCurrentCompleted ? 'Concluída' : 'Marcar como Concluída';
        nextBtn.disabled = currentLesson >= totalLessons;
    }

    // Complete button handler
    completeBtn.addEventListener('click', function () {
        if (!completedLessons.has(currentLesson)) {
            completedLessons.add(currentLesson);
            updateProgress();
            updateLessonStates();
            
            if (currentLesson < totalLessons) {
                setTimeout(() => {
                    currentLesson++;
                    updateLessonStates();
                    updateVideo(currentLesson);
                }, 500);
            }
        }
    });

    // Next button handler
    nextBtn.addEventListener('click', function () {
        if (currentLesson < totalLessons) {
            currentLesson++;
            updateLessonStates();
            updateVideo(currentLesson);
        }
    });

    // Lesson click handler
    lessonList.addEventListener('click', function (e) {
        const lessonItem = e.target.closest('.lesson-item');
        if (lessonItem) {
            const lessonNum = parseInt(lessonItem.dataset.lesson, 10);
            
            if (lessonNum >= 1 && lessonNum <= totalLessons) {
                currentLesson = lessonNum;
                updateLessonStates();
                updateVideo(currentLesson);
            }
        }
    });
});

//pegar as informações

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
  fetch("assets/js/data/online.json")
    .then(res => res.json())
    .then(data => {
      data.cursos.forEach(treino => {
        const id = treino.id;

        const titulo = document.getElementById(`titulo-${id}`);
        const totalAulas = document.getElementById(`totalAulas-${id}`);
        const card = document.getElementById(`card-${id}`);

        if (titulo) titulo.textContent = treino.titulo;
        if (totalAulas) totalAulas.textContent = treino.totalAulas;
        if (card) {
          card.onclick = () => {
            window.location.href = `/treino_online.html?id=${id}&nome=${treino.nomeurl}`;
          };
        }
      });
    })
    .catch(error => console.error("Erro ao carregar online.json:", error));
});

document.addEventListener("DOMContentLoaded", () => { /* DOMContentLoaded --> espera o HTML ser executado para executar o JS */
  const params = new URLSearchParams(window.location.search); /* window.location.search --> recebe tudo que vem depois do ? (no caso ?id=${id}) */
  /* esse params relaciona o html especifico (treino.html) com o generalizado (treinos.html) pois recebe do URL o id */
  const onlineId = parseInt(params.get("id"));
  if (!onlineId) return;

  fetch("assets/js/data/online.json")
    .then(res => res.json())
    .then(data => {
      const online = data.cursos.find(t => t.id === onlineId)
      if (!online) return;

      const tituloElement = document.querySelector(".main-titulo");
      if (tituloElement) tituloElement.textContent = online.titulo;
      online.aulas.forEach((ex, index) => {
        const nomeElemento = document.getElementById(`ex-nome-${index + 1}`); /* index + pois o index comeca em 0 */
        const descElemento = document.getElementById(`ex-desc-${index + 1}`);

        if (nomeElemento) nomeElemento.textContent = ex.nome;
        if (descElemento) descElemento.innerHTML = ex.descricao;
      });
    })
    .catch(err => console.error("Erro ao carregar treino:", err));
});


//TREINOS
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





