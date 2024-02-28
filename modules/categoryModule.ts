import { Task } from './taskModule';

export  module CategoryModule {
    export interface Category {
        id: number;
        name: string;
        tasks: Task[];
    }
}