import { useCallback, useEffect, useState } from "react";
import Task from "../model/task";
import TaskList from "../Task/TaskList";

const Optional: React.FC = (props) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTaskHandler = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/tasks/priority/3');

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
        <h1>Optional</h1>
        <TaskList taskArray={tasks} />
      </div>
    );
  };

export default Optional;