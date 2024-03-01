console.log("slt c moi");
import { TaskManager } from "./modules/TaskManager.js";
let taskManager = new TaskManager();
let title;
let description;
let date;
let etat;
document.querySelector("#taskForm").addEventListener("submit", function (event) {
    event.preventDefault();
    // Move these lines inside the event handler
    title = document.querySelector("#taskTitle").value;
    description = document.querySelector("#taskDescription").value;
    date = new Date(document.querySelector("#taskDueDate").value);
    etat = document.querySelector("#taskPriority").value;
    if (title && description && date && etat) {
        createNewTask(title, description, date, etat);
        envoieFormulaire(event);
    }
    else {
        alert("Veuillez remplir tous les champs");
    }
});
function createNewTask(title, description, date, etat) {
    let newTask = {
        id: taskManager.getTasks().length + 1,
        titre: title,
        description: description,
        date: date,
        etat: etat,
    };
    return newTask;
}
function createTaskElement(newTask, etatString) {
    let taskDiv = document.createElement("div");
    let date = new Date(newTask.date);
    let isValidDate = !isNaN(date.getTime());
    taskDiv.className = `task ${newTask.etat}`;
    let h3 = document.createElement("h3");
    h3.textContent = `${newTask.titre} `;
    let span = document.createElement("span");
    span.textContent = `– ${etatString}`;
    h3.appendChild(span);
    taskDiv.appendChild(h3);
    let dateP = document.createElement("p");
    if (isValidDate) {
        dateP.textContent = `Date d'échéance: ${date.toISOString().split("T")[0]}`;
    }
    else {
        dateP.textContent = `Date d'échéance: Invalid date`;
    }
    taskDiv.appendChild(dateP);
    let descriptionP = document.createElement("p");
    descriptionP.textContent = `${newTask.description}`;
    taskDiv.appendChild(descriptionP);
    let deleteButton = document.createElement('button');
    deleteButton.type = "button";
    deleteButton.className = "deleteTask";
    deleteButton.textContent = "Supprimer";
    deleteButton.addEventListener('click', () => {
        taskManager.deleteTask(newTask.id);
        taskDiv.remove();
    });
    taskDiv.appendChild(deleteButton);
    let modal = document.querySelector(".modal");
    let modifyButton = document.createElement('button');
    modifyButton.className = "buttonModify, edit-btn";
    modifyButton.textContent = "Modifier";
    modifyButton.addEventListener('click', () => {
        modal.style.display = "block";
    });
    taskDiv.appendChild(modifyButton);
    return taskDiv;
}
// event preventDefault pour empecher le rechargement de la page quand on submit le form(ca auto recharge la page directement apres avoir appuyé sur submit)
function envoieFormulaire(event) {
    event.preventDefault();
    let newTask = createNewTask(title, description, date, etat);
    //ajout de la tache à partir de la classe TaskManager
    taskManager.addTask(newTask);
    console.log(taskManager.getTasks());
    //je crée une nouvelle variable qui contient l'état en string pour l'afficher dans l'html
    //afin d éviter de mélanger "etat" pour le rapeler dans la classe css et "etatString" pour l'afficher en texte dans l'html
    let etatString;
    if (etat === "high") {
        etatString = "Priorité haute";
    }
    else if (etat === "medium") {
        etatString = "Priorité moyenne";
    }
    else {
        etatString = "Priorité basse";
    }
    let taskElement = createTaskElement(newTask, etatString);
    let tasksDiv = document.getElementById("tasks");
    tasksDiv.appendChild(taskElement);
}
// function updateTask(event: Event) {
//   event.preventDefault();
//   let title = (document.querySelector("#updateTitle") as HTMLInputElement).value;
//   let description = (document.querySelector("#updateDescription") as HTMLInputElement).value;
//   let date = new Date((document.querySelector("#updateDate") as HTMLInputElement).value);
//   let etat = (document.querySelector("#updateEtat") as HTMLInputElement).value;
//   taskManager.updateTask(taskId, title, description, date, etat);
//   console.log(taskManager.getTasks());
// }
let updateForm = document.querySelector("#updateForm");
// updateForm.addEventListener("submit", updateTask);
//
//FILTRES
//
function filtreTask() {
    let filterValuePriorityElement = document.querySelector("#filterPriority");
    let filterValuePriority = filterValuePriorityElement.value;
    console.log(filterValuePriority);
    // let tasks = taskManager.getTasks();
}
document.querySelector("#applyFilter").addEventListener("submit", filtreTask);
