import React, { useState } from 'react';

import Task from '../components/model/task';

type TaskContextObj = {
  items: Task[];
  addTask: (title: string, description: string, completed: boolean, priority: string) => void;
  removeTask: (taskId: string) => void;
  //updatefnc
};

export const TaskContext = React.createContext<TaskContextObj>({
  items: [],
  addTask: () => {},
  removeTask: (taskId: string) => {},
});

const TaskContextProvider: React.FC = (props) => {
  const [taskList, setTaskList] = useState<Task[]>([new Task('1', "task 1", "task 1 description", false, '1'),
  new Task('2', "task 2", "task 2 description", false, '1'),
  new Task('3', "task 3", "task 3 description", false, '1'),]);

  const addTaskHandler = (title: string, description: string,completed: boolean, priority: string) => {
    const newTask = new Task('1', title, description, completed,priority);

    setTaskList((prevTasks) => {
      return prevTasks.concat(newTask);
    });
  };

  const removeTaskHandler = (taskId: string) => {
    setTaskList((prevTasks) => {
      return prevTasks.filter((tasks) => tasks.id !== taskId);
    });
  };

  const contextValue: TaskContextObj = {
    items: taskList,
    addTask: addTaskHandler,
    removeTask: removeTaskHandler,
  };

  return (<TaskContext.Provider value={contextValue}>
      {props.children}
  </TaskContext.Provider>);
};

export default TaskContextProvider;
