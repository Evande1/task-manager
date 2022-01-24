import { useCallback, useEffect, useState } from 'react';
import Task from '../model/task';
import TaskList from '../Task/TaskList';

const Home: React.FC = (props) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState('');

  const fetchTaskHandler = useCallback(async () => {
    
    try {
      const response = await fetch(`${process.env.REACT_APP_API_END_POINT}/api/tasks`);

      const data = await response.json();

      const loadedTasks = [];


      for (let i = 0; i < data.length; i++) {
        loadedTasks.push(
          new Task(
            data[i]._id,
            data[i].title,
            data[i].description,
            data[i].completed,
            data[i].priority
          )
        );
      }
      setTasks(loadedTasks);
    } catch (error) {
      setError('error');
    }
  }, []);

  useEffect(() => {
    fetchTaskHandler();
  }, [fetchTaskHandler]);

  return (
    <div>
      <h1>Home</h1>
      <TaskList taskArray={tasks} />
    </div>
  );
};

export default Home;
