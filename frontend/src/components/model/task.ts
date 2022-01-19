class Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    priority: number;

    constructor(id: number, title: string, description: string, completed:boolean, priority: number) {
        this.id=id;
        this.title=title;
        this.description=description;
        this.completed=completed;
        this.priority=priority;
    }

}

export default Task;