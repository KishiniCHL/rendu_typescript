console.log("slt c moi");

interface task {
    id: number;
    titre: string;
    description: string;
    date: Date;
    etat: string;
}

interface category{
    id: number;
    name: string;
    tasks: task[];
}

class TaskManager{
    //definition des attributs pour la classe TaskManager
    private tasks: task[] = [];

    //ajouter une tache
    addTask(task: task){
        this.tasks.push(task);
    }


    getTasks(){
        return this.tasks;
    }

}

class CategoryManager{
    private categories: category[] = [];

    addCategory(category: category){
        this.categories.push(category);
    }

    getCategories(){
        return this.categories;
    }
}


//instanciation 
let taskManager = new TaskManager();
let categoryManager = new CategoryManager();

let newTask: task = {
    id: 1,
    titre: "Test",
    description: "Test",
    date: new Date(),
    etat: "En cours"
}

taskManager.addTask(newTask);

console.log(taskManager.getTasks());
