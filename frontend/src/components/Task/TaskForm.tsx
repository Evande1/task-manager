import React, { useContext, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TaskContext } from '../../store/task-context';
import { InputLabel, MenuItem, Select, TextField } from '@material-ui/core';





const TaskForm: React.FC<{ onHideForm: () => void; open: boolean }> = (
  props
) => {
  const [test, setTest] = useState('');
  const taskCtx = useContext(TaskContext);

  const titleInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLInputElement>(null);
  const completedInputRef = useRef<HTMLInputElement>(null);
  const priorityInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

  };

  return (
    <Modal
      open={props.open}
      onClose={props.onHideForm}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}}>
        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" ref={titleInputRef}/>
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input type="text" id="description" ref={descriptionInputRef}/>
          </div>
          <div>
            <label htmlFor="completed">Completed</label>
            <input type="checkbox" id="completed" ref={completedInputRef}/>
          </div>
          <div>
            <InputLabel>Priority</InputLabel>
            <Select label="priority" >
              <MenuItem value='urgent'>Urgent</MenuItem>
              <MenuItem value='current'>Current</MenuItem>
              <MenuItem value='optional'>Optional</MenuItem>
            </Select>
          </div>
          <button>Add</button>
          <button onClick={props.onHideForm}>Cancel</button>
        </form>
      </Box>
    </Modal>
  );
};

export default TaskForm;
