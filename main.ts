import { Task } from "./modules/taskModule";
import { Category } from "./modules/categoryModule";
import { TaskManager } from "./modules/TaskManager.js";
import { CategoryManager } from "./modules/CategoryManager.js";


let taskManager = new TaskManager();


let title: string;
let description: string;
let date: Date;
let etat: string;
// let category: string = "Travail";

//START LOCAL STORAGE//
//
function saveTasks() {
  const tasks = taskManager.getTasks();
  console.log('sauvegardes tâches :', tasks);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem("tasks");
  if (taskJSON === null) return [];
  const tasks = JSON.parse(taskJSON);
  return tasks;
}

const tasks: Task[] = loadTasks();
tasks.forEach(task => {
  //ajouter chaque tache à partir de la TaskManager
  taskManager.addTask(task);

  //creer un element pour chaque tache dans le local storage
  let taskElement = createTaskElement(task);

  let tasksDiv = document.querySelector("#tasks");
  tasksDiv!.appendChild(taskElement);
});
//
//FIN LOCAL STORAGE//


//START ENVOIE FORMULAIRE//
//
document.querySelector("#taskForm")!.addEventListener("submit", function (event) {
  event.preventDefault();

  title = (document.querySelector("#taskTitle") as HTMLInputElement).value;
  description = (document.querySelector("#taskDescription") as HTMLInputElement).value;
  date = new Date((document.querySelector("#taskDueDate") as HTMLInputElement).value);
  etat = (document.querySelector("#taskPriority") as HTMLInputElement).value;
  // category = (document.querySelector("#taskCategory") as HTMLInputElement).value;

  if (title && description && date && etat) {
    createNewTask(title, description, date, etat);
    envoieFormulaire(event);
  } else {
    alert("Veuillez remplir tous les champs");
  }
});

function createNewTask(title: string, description: string, date: Date, etat: string): Task {


  let newTask: Task = {
    id: taskManager.getTasks().length + 1,
    titre: title,
    description: description,
    date: date,
    etat: etat,
    // categorie: category
  };

  return newTask;
}


// event preventDefault pour empecher le rechargement de la page quand on submit le form(ca auto recharge la page directement apres avoir appuyé sur submit)
function envoieFormulaire(event: Event) {
  event.preventDefault();

  let newTask = createNewTask(title, description, date, etat);

  //ajout de la tache à partir de la classe TaskManager
  taskManager.addTask(newTask);
  saveTasks();

  console.log(taskManager.getTasks());

  let taskElement = createTaskElement(newTask);
  let tasksDiv = document.querySelector("#tasks");
  tasksDiv!.appendChild(taskElement);
}
//
//FIN ENVOIE FORMULAIRE//


// START AFFICHAGE TACHE//
//
function createTaskElement(newTask: Task): HTMLElement {

  let taskDiv = document.createElement("div");

  let date = new Date(newTask.date);
  let isValidDate = !isNaN(date.getTime());

  taskDiv.className = `task ${newTask.etat}`;



  //je crée une nouvelle variable qui contient l'état en string pour l'afficher dans l'html
  //afin d éviter de mélanger "etat" pour le rapeler dans la classe css et "etatString" pour l'afficher en texte dans l'html
  let etatString: string;
  if (newTask.etat === "high") {
    etatString = "Priorité haute";
  }
  else if (newTask.etat === "medium") {
    etatString = "Priorité moyenne";
  }
  else {
    etatString = "Priorité basse";
  }

  let h3 = document.createElement("h3");
  h3.textContent = `${newTask.titre} `;
  let span = document.createElement("span");
  span.textContent = `– ${etatString}`;
  h3.appendChild(span);
  taskDiv.appendChild(h3);

  let dateP = document.createElement("p");
  dateP.textContent = `Date d'échéance: ${date.toISOString().split("T")[0]}`;

  taskDiv.appendChild(dateP);

  let category = document.createElement("p");
  // category.textContent = `Categorie : ${newTask.categorie}`;
  taskDiv.appendChild(category);

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
    saveTasks();
    console.log(taskManager.getTasks());
  });
  taskDiv.appendChild(deleteButton);


  let modifyButton = document.createElement('button');
  modifyButton.className = "buttonModify, edit-btn";
  modifyButton.textContent = "Modifier";
  modifyButton.addEventListener('click', () => {
    toggleModal();
    preFillForm(newTask.id);

    let updateForm = document.querySelector("#updateForm") as HTMLFormElement;

    updateForm.addEventListener("submit", function (event) {
      updateTask(event);
    });
  });

  taskDiv.appendChild(modifyButton);

  return taskDiv;
}

//FIN AFFICHAGE TACHE//


//DEBUT MODAL//
//
let modal = document.querySelector(".modal") as HTMLElement;
let closeButton = document.querySelector(".close") as HTMLElement;


function toggleModal() {
  modal.style.display = modal.style.display === "none" ? "block" : "none";
}

closeButton.addEventListener("click", toggleModal);
//
//FIN MODAL//


//UPDATE TACHE //
//

function preFillForm(taskId: number) {
  const task = taskManager.getTasks().find(task => task.id === taskId);

  // remplir en avance le formulaire avec les valeurs de la tache
  if (task) {
    (document.getElementById("updateTitle") as HTMLInputElement).value = task.titre;
    (document.getElementById("updateDescription") as HTMLTextAreaElement).value = task.description;
    (document.getElementById("updateDate") as HTMLInputElement).value = task.date.toISOString().split("T")[0];
    (document.getElementById("updateEtat") as HTMLSelectElement).value = task.etat;

    //input pour save l'id 
    (document.querySelector("#updateTaskId") as HTMLInputElement).value = taskId.toString();
  }
}

function updateTask(event: Event) {
  event.preventDefault();

  let taskId = parseInt((document.querySelector("#updateTaskId") as HTMLInputElement).value);

  let title = (document.querySelector("#updateTitle") as HTMLInputElement).value;
  let description = (document.querySelector("#updateDescription") as HTMLTextAreaElement).value;
  let date = new Date((document.querySelector("#updateDate") as HTMLInputElement).value);
  let etat = (document.querySelector("#updateEtat") as HTMLSelectElement).value;
  // let category = (document.querySelector("#updateCategory") as HTMLSelectElement).value;

  taskManager.updateTask(taskId, title, description, date, etat);
  console.log(taskManager.getTasks());

}

let updateForm = document.querySelector("#updateForm") as HTMLFormElement;
updateForm.addEventListener("submit", updateTask);
//
////FIN UPDATE TACHE////


//DEBUT CATEGORIES//
//
let categoryManager = new CategoryManager();

document.querySelector("#addCategory")!.addEventListener("click", function (event) {
  event.preventDefault();

  let categoryName = (document.querySelector("#categoryTitle") as HTMLInputElement).value;

  if (categoryName) {
    addCategory(categoryName);
  } else {
    alert("Veuillez entrer le nom de la catégorie");
  }
});

function addCategory(categoryName: string) {
  let category: Category = {
    id: categoryManager.getCategories().length + 1,
    name: categoryName,
    tasks: []
  };

  categoryManager.addCategory(category);
  updateCategoryOptions();
}

function updateCategoryOptions() {
  let taskCategorySelect = document.querySelector("#taskCategory") as HTMLSelectElement;

  // Clear existing options
  taskCategorySelect.innerHTML = '<option value="">Choisir une catégorie</option>';

  // Add updated options
  categoryManager.getCategories().forEach(category => {
    let option = document.createElement("option");
    option.value = category.name;
    option.textContent = category.name;
    taskCategorySelect.appendChild(option);
  });
}
//
//FIN CATEGORIES


// DEBUT FILTRES
//

function filtreTask() {
  let filterValuePriorityElement = document.querySelector("#filterPriority") as HTMLInputElement;

  let filterValuePriority = filterValuePriorityElement.value;

  console.log(filterValuePriority);


}

document.querySelector("#applyFilter")!.addEventListener("submit", filtreTask);


//
//FIN FILTRES//

