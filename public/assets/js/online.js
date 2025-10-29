document.addEventListener('DOMContentLoaded', function () {
    const lessonList = document.getElementById('lessonList');
    const completeBtn = document.getElementById('completeBtn');
    const nextBtn = document.getElementById('nextBtn');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const lessonVideo = document.getElementById('lessonVideo');

    let currentLesson = 1;
    const totalLessons = 6;
    let completedLessons = 0;

    /* const videoIds = {
        1: "U6tzlAShVA0?si=xw2HSofsrJe19mGA",
        2: "nlO2tSWpVaQ?si=NRJGYxBlsBJ5pq_W",
        3: "V6XeILhMIWY?si=TJOj2dcaid_Tb2rE	",
        4: "RlXAM8417Y8?si=tPz28C0qInbDGyan",
        5: "5PmiSjXUx6k?si=IUUENAFa8UwOYcyF",
        6: "wM7Ja43QJuE?si=o8w9LrrrmOWvySKb",
    };
*/
    function updateVideo(lessonNumber) {
        const videoId = videoIds[lessonNumber];
        lessonVideo.src = `https://www.youtube.com/embed/${videoId}?si=7LMJePcWnqAcLo8Q`;
    }


    function updateProgress() {
        const progress = (completedLessons / totalLessons) * 100;
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `${Math.round(progress)}% Completo`;
    }

    function updateLessonStates() {
        const lessons = lessonList.getElementsByClassName('lesson-item');
        Array.from(lessons).forEach((lesson, index) => {
            const lessonNum = index + 1;
            lesson.classList.remove('completed', 'active');

            if (lessonNum < currentLesson) {
                lesson.classList.add('completed');
            } else if (lessonNum === currentLesson) {
                lesson.classList.add('active');
            }
        });
        completeBtn.disabled = false;
        nextBtn.disabled = currentLesson >= totalLessons;
    }


    completeBtn.addEventListener('click', function () {
        const currentLessonElement = document.querySelector(`[data-lesson="${currentLesson}"]`);
        if (!currentLessonElement.classList.contains('completed')) {
            currentLessonElement.classList.add('completed');
            completedLessons++;
            updateProgress();
        }
        if (currentLesson < totalLessons) {
            currentLesson++;
            updateLessonStates();
            updateVideo(currentLesson);
        }
    });


    nextBtn.addEventListener('click', function () {
        if (currentLesson < totalLessons) {
            currentLesson++;
            updateLessonStates();
            updateVideo(currentLesson);
        }
    });


    lessonList.addEventListener('click', function (e) {
        const lessonItem = e.target.closest('.lesson-item');
        if (lessonItem) {
            const lessonNum = parseInt(lessonItem.dataset.lesson);
            if (lessonNum <= currentLesson) {
                currentLesson = lessonNum;
                updateLessonStates();
                updateVideo(currentLesson);
            }
        }
    });


    updateProgress();
    updateLessonStates();
    updateVideo(currentLesson);
});

/* ACHAR PRODUTOS */
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



