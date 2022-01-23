import React, { useContext, useRef, useState } from 'react';
import Box from '@mui/material/Box';

import Modal from '@mui/material/Modal';
import { TaskContext } from '../../store/task-context';
import { InputLabel, MenuItem, Select } from '@material-ui/core';
import { request } from 'http';

const TaskForm: React.FC<{ onHideForm: () => void; open: boolean}> = (
  props
) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [priority, setPriority] = useState('');

  const taskCtx = useContext(TaskContext);

  const submitHandler = async (event: React.SyntheticEvent) => {
    // event.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title,
        description: description,
        completed: completed,
        priority: priority,
      }),
    };
  
    const response = await fetch(
      'http://localhost:8000/api/tasks',
      requestOptions
    );
    const data = await response.json();
    
  };

  return (
    <Modal
      open={props.open}
      onClose={props.onHideForm}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="completed">Completed</label>
            <input
              type="checkbox"
              id="completed"
              onChange={(e) => setCompleted(e.target.checked)}
            />
          </div>
          <div>
            <InputLabel>Priority</InputLabel>
            <Select
              label="priority"
              onChange={(
                e: React.ChangeEvent<{ name?: string; value: unknown }>
              ) =>
                setPriority(
                  typeof e.target.value === 'string' ? e.target.value : ''
                )
              }
            >
              <MenuItem value={'1'}>Urgent</MenuItem>
              <MenuItem value={'2'}>Current</MenuItem>
              <MenuItem value={'3'}>Optional</MenuItem>
            </Select>
          </div>
          <button type="submit">Add</button>
          <button onClick={props.onHideForm}>Cancel</button>
        </form>
      </Box>
    </Modal>
  );
};

export default TaskForm;
