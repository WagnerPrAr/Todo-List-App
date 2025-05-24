  import {
  TextField,
  Box,
  Typography,
  Button,
  IconButton,
  Modal
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import { useState } from 'react';

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
  
  export default function NewModal({todosList, setTodosList, todo}) {
      const [toggleModal, setToggleModal] = useState<boolean>(false);
      const [editDescription, setEditDescription] = useState<string>('');
      const [editTittle, setEditTittle] = useState<string>('');

    const openModal = () => setToggleModal(true);
    const closeModal = () => {
      setToggleModal(false);
    };

    function EditTask(id: number) {
      const task = todosList.find((todo) => todo.id === id);
      if (task) {
        if (editTittle) {
          const newTodo = todosList.map((todo) =>
            todo.id === id
              ? { ...todo, description: editDescription, tittle: editTittle }
              : { ...todo },
          );
          setTodosList(newTodo);
        } else {
          console.log('Please fill at least the tittle');
          closeModal();
        }
      }
      closeModal();
    }

    return (
      <>
        <IconButton disabled={todo.completed} onClick={openModal}>
          <Edit
            color={todo.completed ? 'disabled' : 'primary'}
            sx={{ height: '100%' }}
            fontSize="large"
          />
        </IconButton>
        <Modal
          open={toggleModal}
          onClose={closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography color="black" variant="h5">
              Set your new task:{' '}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                paddingY: 2,
              }}
            >
              <TextField
                fullWidth
                color="secondary"
                label="Tittle"
                id="tittle"
                value={editTittle}
                onChange={(e) => setEditTittle(e.target.value)}
              />
              <TextField
                fullWidth
                color="secondary"
                label="Description"
                variant="outlined"
                id="description"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
            </Box>
            <Box sx={{ justifySelf: 'end' }}>
              <Button onClick={closeModal}>Cancel</Button>
              <Button onClick={() => EditTask(todo.id)}>Save</Button>
            </Box>
          </Box>
        </Modal>
      </>
    );
  }