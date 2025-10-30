// document.addEventListener('DOMContentLoaded', function () {
//     const lessonList = document.getElementById('lessonList');
//     const completeBtn = document.getElementById('completeBtn');
//     const nextBtn = document.getElementById('nextBtn');
//     const progressFill = document.getElementById('progressFill');
//     const progressText = document.getElementById('progressText');
//     const lessonVideo = document.getElementById('lessonVideo');

//     let currentLesson = 1;
//     const totalLessons = 6;
//     let completedLessons = 0;

//     const videoIds = {
//         1: "U6tzlAShVA0?si=xw2HSofsrJe19mGA",
//         2: "nlO2tSWpVaQ?si=NRJGYxBlsBJ5pq_W",
//         3: "V6XeILhMIWY?si=TJOj2dcaid_Tb2rE	",
//         4: "RlXAM8417Y8?si=tPz28C0qInbDGyan",
//         5: "5PmiSjXUx6k?si=IUUENAFa8UwOYcyF",
//         6: "wM7Ja43QJuE?si=o8w9LrrrmOWvySKb",
//     };

//     function updateVideo(lessonNumber) {
//         const videoId = videoIds[lessonNumber];
//         lessonVideo.src = `https://www.youtube.com/embed/${videoId}?si=7LMJePcWnqAcLo8Q`;
//     }


//     function updateProgress() {
//         const progress = (completedLessons / totalLessons) * 100;
//         progressFill.style.width = `${progress}%`;
//         progressText.textContent = `${Math.round(progress)}% Completo`;
//     }

//     function updateLessonStates() {
//         const lessons = lessonList.getElementsByClassName('lesson-item');
//         Array.from(lessons).forEach((lesson, index) => {
//             const lessonNum = index + 1;
//             lesson.classList.remove('completed', 'active');

//             if (lessonNum < currentLesson) {
//                 lesson.classList.add('completed');
//             } else if (lessonNum === currentLesson) {
//                 lesson.classList.add('active');
//             }
//         });


//         completeBtn.disabled = false;
//         nextBtn.disabled = currentLesson >= totalLessons;
//     }


//     completeBtn.addEventListener('click', function () {
//         const currentLessonElement = document.querySelector(`[data-lesson="${currentLesson}"]`);
//         if (!currentLessonElement.classList.contains('completed')) {
//             currentLessonElement.classList.add('completed');
//             completedLessons++;
//             updateProgress();
//         }
//         if (currentLesson < totalLessons) {
//             currentLesson++;
//             updateLessonStates();
//             updateVideo(currentLesson);
//         }
//     });


//     nextBtn.addEventListener('click', function () {
//         if (currentLesson < totalLessons) {
//             currentLesson++;
//             updateLessonStates();
//             updateVideo(currentLesson);
//         }
//     });


//     lessonList.addEventListener('click', function (e) {
//         const lessonItem = e.target.closest('.lesson-item');
//         if (lessonItem) {
//             const lessonNum = parseInt(lessonItem.dataset.lesson);
//             if (lessonNum <= currentLesson) {
//                 currentLesson = lessonNum;
//                 updateLessonStates();
//                 updateVideo(currentLesson);
//             }
//         }
//     });


//     updateProgress();
//     updateLessonStates();
//     updateVideo(currentLesson);
// });
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
    const totalLessons = 6;
    let completedLessons = new Set(); // Track completed lessons with a Set

    // Video IDs (cleaned up - removed extra tabs/spaces)
    const videoIds = {
        1: "U6tzlAShVA0?si=xw2HSofsrJe19mGA",
        2: "nlO2tSWpVaQ?si=NRJGYxBlsBJ5pq_W",
        3: "V6XeILhMIWY?si=TJOj2dcaid_Tb2rE",
        4: "RlXAM8417Y8?si=tPz28C0qInbDGyan",
        5: "5PmiSjXUx6k?si=IUUENAFa8UwOYcyF",
        6: "wM7Ja43QJuE?si=o8w9LrrrmOWvySKb",
    };

    // Update video iframe
    function updateVideo(lessonNumber) {
        const videoId = videoIds[lessonNumber];
        if (videoId) {
            lessonVideo.src = `https://www.youtube.com/embed/${videoId}`;
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

            // Mark completed lessons
            if (completedLessons.has(lessonNum)) {
                lesson.classList.add('completed');
            }
            
            // Mark current active lesson
            if (lessonNum === currentLesson) {
                lesson.classList.add('active');
            }
        });

        // Update button states
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
            
            // Auto-advance to next lesson if available
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
            
            // Allow navigation to any lesson (not just up to current)
            if (lessonNum >= 1 && lessonNum <= totalLessons) {
                currentLesson = lessonNum;
                updateLessonStates();
                updateVideo(currentLesson);
            }
        }
    });

    // Initialize
    updateProgress();
    updateLessonStates();
    updateVideo(currentLesson);
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
        if (totalAulas) totalAulas.textContent = online.totalAulas;
        if (card) {
          card.onclick = () => {
            window.location.href = `/treino_online.html?id=${id}&nome=${online.nomeurl}`;
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




