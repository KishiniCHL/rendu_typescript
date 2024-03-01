console.log("slt c moi");
class TaskManager {
    //definition des attributs pour la classe TaskManager
    tasks = [];
    //ajouter une tache
    addTask(task) {
        this.tasks.push(task);
    }
    deleteTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
    }
    updateTask(taskId, title, description, date, etat) {
        let task = this.tasks.find(task => task.id === taskId);
        if (task) {
            task.titre = title;
            task.description = description;
            task.date = date;
            task.etat = etat;
        }
    }
    getTasks() {
        return this.tasks;
    }
}
// class CategoryManager{
//     private categories: Category[] = [];
//     addCategory(category: Category){
//         this.categories.push(category);
//     }
//     getCategories(){
//         return this.categories;
//     }
// }
let taskManager = new TaskManager();
// let categoryManager = new CategoryManager();
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
    taskDiv.className = `task ${newTask.etat}`;
    let h3 = document.createElement("h3");
    h3.textContent = `${newTask.titre} `;
    let span = document.createElement("span");
    span.textContent = `– ${etatString}`;
    h3.appendChild(span);
    taskDiv.appendChild(h3);
    let dateP = document.createElement("p");
    dateP.textContent = `Date d'échéance: ${newTask.date.toISOString().split("T")[0]}`;
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
    let title = document.querySelector("#taskTitle").value;
    let description = document.querySelector("#taskDescription").value;
    let date = new Date(document.querySelector("#taskDueDate").value);
    let etat = document.querySelector("#taskPriority")
        .value;
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
function updateTask(event, taskId) {
    event.preventDefault();
    let title = document.querySelector("#updateTitle").value;
    let description = document.querySelector("#updateDescription").value;
    let date = new Date(document.querySelector("#updateDate").value);
    let etat = document.querySelector("#updateEtat").value;
    taskManager.updateTask(taskId, title, description, date, etat);
    console.log(taskManager.getTasks());
}
let updateForm = document.querySelector("#updateForm");
updateForm.addEventListener("submit", updateTask);
document.querySelector("#taskForm").addEventListener("submit", envoieFormulaire);
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
export {};
