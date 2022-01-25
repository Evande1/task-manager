import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import { TextField } from '@mui/material';

const TaskForm: React.FC<{ onHideForm: () => void; open: boolean }> = (
  props
) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [priority, setPriority] = useState('');

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
      `${process.env.REACT_APP_API_END_POINT}/tasks`,
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
          <Box
            sx={{
              marginBottom: '0.5rem',
            }}
          >
            <TextField
              required
              label="Title"
              onChange={(e) => setTitle(e.target.value)}
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
            />
          </Box>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox onChange={(e) => setCompleted(e.target.checked)} />
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
            <Button variant="outlined" type="submit" >
              Add
            </Button>
            </Box>
            <Button variant="outlined" onClick={props.onHideForm}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default TaskForm;
