import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import BaseTemplate from './components/UI/BaseTemplate';
import TaskContextProvider from './store/task-context';
import TaskForm from './components/Task/TaskForm';
// import Box from "@material-ui/core/Box";

function App() {
  return (
    <TaskContextProvider>
      <BaseTemplate>
        <h2>hello</h2>
        <TaskForm/>
      </BaseTemplate>
    </TaskContextProvider>
  );
}

export default App;
