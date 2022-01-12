import React, { useState } from 'react';

import task from '../components/model/task';

type TaskContextObj = {
  items: task[];
  addTask: (title: string, description: string) => void;
  removeTask: (taskId: number) => void;
  //updatefnc
};

export const TaskContext = React.createContext<TaskContextObj>({
  items: [],
  addTask: () => {},
  removeTask: (taskId: number) => {},
});

const TaskContextProvider: React.FC = (props) => {
  const [taskList, setTaskList] = useState<task[]>([]);

  const addTaskHandler = (title: string, description: string) => {
    const newTask = new task(Math.random(), title, description, false);

    setTaskList((prevTasks) => {
      return prevTasks.concat(newTask);
    });
  };

  const removeTaskHandler = (taskId: number) => {
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
