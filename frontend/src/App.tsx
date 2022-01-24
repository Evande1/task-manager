import React, { useState } from 'react';

import './App.css';
import BaseTemplate from './components/UI/BaseTemplate';
import TaskContextProvider from './store/task-context';
import TaskForm from './components/Task/TaskForm';
import Current from './components/pages/Current';
import { Route, Routes } from 'react-router-dom';
import Optional from './components/pages/Optional';
import Urgent from './components/pages/Urgent';
import Home from './components/pages/Home';

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
        <TaskForm open={formIsShown} onHideForm={hideFormHandler} />
      </BaseTemplate>
      <Routes>
        <Route path="/current" element={<Current />} />
        <Route path="/urgent" element={<Urgent />} />
        <Route path="/optional" element={<Optional />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </TaskContextProvider>
  );
}

export default App;
