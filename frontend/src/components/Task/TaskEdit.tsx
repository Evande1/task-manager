import React, { useState } from 'react';
import Box from '@mui/material/Box';

import Modal from '@mui/material/Modal';

import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';

const TaskEdit: React.FC<{
  onHideForm: () => void;
  open: boolean;
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: string;
}> = (props) => {
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [completed, setCompleted] = useState(props.completed);
  const [priority, setPriority] = useState(props.priority);
  

  const deleteHandler = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    await fetch(
      `${process.env.REACT_APP_API_END_POINT}/tasks/${props.id}`, {method:'DELETE'})
      console.log('deletesuccess');
      window.location.reload();
  };

  const confirmHandler = async (event: React.SyntheticEvent) => {
    event.preventDefault();

   

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title,
        description: description,
        completed: completed,
        priority: priority,
      }),
    };

    const response = await fetch(
      `${process.env.REACT_APP_API_END_POINT}/tasks/${props.id}`,
      requestOptions
    );
    const data = await response.json();
    console.log('edit');
    window.location.reload();
    
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
        <form>
        <Box
            sx={{
              marginBottom: '0.5rem',
            }}
          >
            <TextField
              required
              label="Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </Box>
          <Box
            sx={{
              marginBottom: '0.5rem',
            }}
          >
            <TextField
              required
              label="Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </Box>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox onChange={(e) => setCompleted(e.target.checked)} checked={completed} />
              }
              label="Completed"
            />
          </FormGroup>
          <FormControl fullWidth>
            <InputLabel id="priority">Priority</InputLabel>
            <Select
              labelId="priority"
              onChange={(
                e: React.ChangeEvent<{ name?: string; value: unknown }>
              ) =>
                setPriority(
                  typeof e.target.value === 'string' ? e.target.value : ''
                )
              }
              value={priority}
            >
              <MenuItem value={'1'}>Urgent</MenuItem>
              <MenuItem value={'2'}>Current</MenuItem>
              <MenuItem value={'3'}>Optional</MenuItem>
            </Select>
          </FormControl>
          <Box
            sx={{
              marginTop: '1.5rem',
              display: 'flex'
            }}
          >
            <Box sx={{ marginRight: '0.5rem'}}>
            <Button variant="outlined" onClick={confirmHandler}>
              Confirm
            </Button>
            </Box>
            <Box sx={{ marginRight: '0.5rem'}}>
            <Button variant="outlined" onClick={deleteHandler}>
              Delete
            </Button>
            </Box>
            <Button variant="outlined" onClick={props.onHideForm}>
              Cancel
            </Button>
          </Box>
          {/* <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              
            />
          </div>
          <div>
            <label htmlFor="completed">Completed</label>
            <input
              type="checkbox"
              id="completed"
              onChange={(e) => setCompleted(e.target.checked)}
              checked={completed}
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
              value={priority}
            >
              <MenuItem value={'1'}>Urgent</MenuItem>
              <MenuItem value={'2'}>Current</MenuItem>
              <MenuItem value={'3'}>Optional</MenuItem>
            </Select>
          </div>
          <button onClick={confirmHandler}>Confirm</button>
          <button onClick={deleteHandler}>Delete</button>
          <button onClick={props.onHideForm}>Cancel</button> */}
        </form>
      </Box>
    </Modal>
  );
};

export default TaskEdit;
