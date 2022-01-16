import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import BaseTemplate from './components/UI/BaseTemplate';
import TaskContextProvider from './store/task-context';
import TaskForm from './components/Task/TaskForm';
// import Box from "@material-ui/core/Box";

function App() {
  const [formIsShown, setFormIsShown] = useState(false);

  const showFormHandler = () => {
    return setFormIsShown(true);
  };

  const hideFormHandler = () => {
    return setFormIsShown(false);
  };

  return (
    <TaskContextProvider>
      <BaseTemplate onShowForm={showFormHandler}>
      <TaskForm open ={formIsShown} onHideForm={hideFormHandler} />
        <h2>hello</h2>
      </BaseTemplate>
    </TaskContextProvider>
  );
}

export default App;
