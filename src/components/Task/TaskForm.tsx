import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

// const Backdrop: React.FC<onClick

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const TaskForm: React.FC<{ onHideForm: () => void, open: boolean}> = (props) => {

  return (
    <Modal
      open={props.open}
      onClose={props.onHideForm}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form>
          <div>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input type="text" id="description" />
          </div>
          <button>Add</button>
          <button onClick={props.onHideForm}>Cancel</button>
        </form>
      </Box>
    </Modal>
  );
};

export default TaskForm;
