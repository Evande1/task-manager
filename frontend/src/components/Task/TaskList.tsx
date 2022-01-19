import React, { useContext } from 'react';
import { TaskContext } from '../../store/task-context';
import Task from '../model/task';
import TaskItem from './TaskItem';

const TaskList: React.FC = (props) => {
  const taskCtx = useContext(TaskContext);

  return (
    <ul>
      {taskCtx.items.map((item) => (
        <TaskItem
          key={item.id}
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
