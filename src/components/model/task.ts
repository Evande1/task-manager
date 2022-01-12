class task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    // priority: urgency;

    constructor(id: number, title: string, description: string, completed:boolean) {
        this.id=id;
        this.title=title;
        this.description=description;
        this.completed=completed;
    }

}

export default task;