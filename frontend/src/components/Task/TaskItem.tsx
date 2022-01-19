const TaskItem: React.FC<{title:string, description: string, completed: boolean, priority: number}> = props => {
    return (
        <li>
            {props.title}
        </li>
    );
};

export default TaskItem;