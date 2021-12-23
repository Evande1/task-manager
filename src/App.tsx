import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import BaseTemplate from './components/UI/BaseTemplate';
// import Box from "@material-ui/core/Box";

function App() {
  const [taskList, setTaskList] = useState([]);

  // const addTaskHandler = () => {
  //   setTaskList()
  // };

  return (
    <BaseTemplate>
        <div className="App">
      <header className="App-header">
      <h2>hello</h2>
      </header>
    </div>

    </BaseTemplate>
  );
}

export default App;
