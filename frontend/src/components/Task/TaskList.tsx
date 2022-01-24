import React, { useContext } from 'react';
import { TaskContext } from '../../store/task-context';
import Task from '../model/task';
import TaskItem from './TaskItem';
import classes from "./TaskList.module.css";

const TaskList: React.FC<{taskArray: Task[]}> = (props) => {

  return (
    <ul className={classes.list}>
      {props.taskArray.map((item) => (
        <TaskItem
          key={item.id}
          id = { item.id}
          title={item.title}
          description={item.description}
          completed={item.completed}
          priority={item.priority}
        />
      ))}
    </ul>
  );
};

export default TaskList;
