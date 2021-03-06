import React, { useState } from 'react';
import TaskEdit from './TaskEdit';
import classes from './TaskItem.module.css';
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css"

const TaskItem: React.FC<{
    id: string;
  key: string;
  title: string;
  description: string;
  completed: boolean;
  priority: string;
}> = (props) => {
  const [editIsShown, setEditIsShown] = useState(false);

  const showEditHandler = () => {
    setEditIsShown(true);
  };

  const hideEditHandler = () => {
    setEditIsShown(false);
  };

  return (
    <div>
      <TaskEdit
        open={editIsShown}
        onHideForm={hideEditHandler}
        id={props.id}
        title={props.title}
        description={props.description}
        completed={props.completed}
        priority={props.priority}
      />
      <li className={props.completed ? classes.completed : classes.item}>
        {props.title}
        <Button variant ="outline-success" onClick={showEditHandler}>Edit</Button>
      </li>
    </div>
  );
};

export default TaskItem;
