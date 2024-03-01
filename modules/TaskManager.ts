import { Task } from "./taskModule";


export class TaskManager {
    //definition des attributs pour la classe TaskManager
    private tasks: Task[] = [];
  
    //ajouter une tache
    addTask(task: Task) {
      this.tasks.push(task);
    }
    deleteTask(taskId: number) {
      this.tasks = this.tasks.filter(task => task.id !== taskId);
    }
  
    updateTask(taskId: number, title: string, description: string, date: Date, etat: string) {
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