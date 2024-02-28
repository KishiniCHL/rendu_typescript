"use strict";
console.log("slt c moi");
class TaskManager {
    constructor() {
        //definition des attributs pour la classe TaskManager
        this.tasks = [];
    }
    //ajouter une tache
    addTask(task) {
        this.tasks.push(task);
    }
    getTasks() {
        return this.tasks;
    }
}
class CategoryManager {
    constructor() {
        this.categories = [];
    }
    addCategory(category) {
        this.categories.push(category);
    }
    getCategories() {
        return this.categories;
    }
}
//instanciation 
let taskManager = new TaskManager();
let categoryManager = new CategoryManager();
let newTask = {
    id: 1,
    titre: "Test",
    description: "Test",
    date: new Date(),
    etat: "En cours"
};
taskManager.addTask(newTask);
console.log(taskManager.getTasks());
