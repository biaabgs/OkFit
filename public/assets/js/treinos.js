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

document.getElementById("taskInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

