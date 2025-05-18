import {
  TextField,
  Box,
  Typography,
  Button,
  Paper,
  IconButton,
} from '@mui/material';
import { FormControl } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RadioButton from '@mui/icons-material/RadioButtonUnchecked';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';
import { useState, useRef } from 'react';

export default function Todos() {
  interface Itask {
    id: number;
    tittle: string | number;
    description: string;
    completed: boolean;
  }

  const [tittle, setTittle] = useState<string | number>('');
  const [description, setDescription] = useState<string>('');
  const [todosList, setTodosList] = useState<Itask[]>([]);
  const [toggleModal, setToggleModal] = useState<boolean>(false);

  const idRef = useRef(todosList.length + 1);

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

  function AddTask() {
    if (tittle) {
      setTodosList([
        ...todosList,
        {
          id: idRef.current++,
          tittle: tittle,
          description: description,
          completed: false,
        },
      ]);
      setTittle('');
      setDescription('');
    } else {
      console.log('Please fill at least the tittle');
    }
  }

  function DeletTask(id: number) {
    const newTodosList = todosList.filter((todo) => todo.id !== id);
    setTodosList(newTodosList);
  }



  function NewModal({todo}: {todo: Itask}) {
    const openModal = () => setToggleModal(true);
    const closeModal = () => {
      setToggleModal(false);
            setTittle('');
      setDescription('');
    };

      function EditTask(id: number) {
    const task = todosList.find((todo) => todo.id === id);
    if (task) {
      if(description && tittle){
              const newTodo = todosList.map((todo) =>
        todo.id === id ? { ...todo, description: description, tittle: tittle } : { ...todo },
      );
      setTodosList(newTodo);
      }else{
        console.log('Please fill at least the tittle');
        closeModal();
      }
    }
    closeModal();
  }

    return(
      <>
           <IconButton disabled={todo.completed} onClick={openModal}>
                      <EditIcon
                        color={todo.completed ? "disabled": "primary"}
                        sx={{ height: '100%' }}
                        fontSize="large"
                      />
           </IconButton>
      <Modal open={toggleModal}
                      onClose={closeModal}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description">
                        <Box sx={style}>
                          <Typography color='black' variant='h5'>Set your new task: </Typography>
                          <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, paddingY: 2}}>
                            <TextField
                              fullWidth
                              color="secondary"
                              label="Tittle"
                              required
                              id="tittle"
                              value={tittle}
                              onChange={(e) => setTittle((e.target as HTMLInputElement).value)}
                            />
                            <TextField
                              fullWidth
                              color="secondary"
                              label="Description"
                              variant="outlined"
                              required
                              id="description"
                              value={description}
                              onChange={(e) => setDescription((e.target as HTMLInputElement).value)}
                            />
                          </Box>
                          <Box sx={{justifySelf: 'end'}}>
                            <Button onClick={closeModal}>Cancel</Button>
                            <Button onClick={() => EditTask(todo.id)}>Save</Button>
                          </Box>
                        </Box>
                      </Modal>
      </>
    )
  }

  function ToggleComplet(id: number) {
    const task = todosList.find((todo) => todo.id === id);
    if (task) {
      const newTodo = todosList.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : { ...todo },
      );
      setTodosList(newTodo);
    }
  }

  return (
    <>
      <FormControl
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 2,
          padding: 5,
          backgroundColor: '#313332',
          borderRadius: 4,
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: 'bold', width: '100%' }}>
          Add Todo
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
        <TextField
          fullWidth
          color="secondary"
          label="Tittle"
          required
          id="tittle"
          value={tittle}
          onChange={(e) => setTittle((e.target as HTMLInputElement).value)}
        />
        <TextField
          fullWidth
          color="secondary"
          label="Description"
          variant="outlined"
          required
          id="description"
          value={description}
          onChange={(e) => setDescription((e.target as HTMLInputElement).value)}
        />

        <Button
          onClick={() => {
            AddTask();
          }}
          color="secondary"
          aria-label="add"
          variant="contained"
        >
          <AddIcon fontSize="large" />
        </Button>
        </Box>
      </FormControl>

      <Box>
        <Box>
          <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
            Todos
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              padding: 4,
            }}
          >
            {todosList.length > 0 ? (
              todosList.map((todo) => (
                <Paper
                  key={todo.id}
                  elevation={2}
                  sx={{ backgroundColor: todo.completed? 'grey':'primary', display: 'flex', paddingX: 4 }}
                >
                  <Box sx={{ alignContent: 'center', marginRight: 4 }}>
                    <IconButton onClick={() => ToggleComplet(todo.id)}>
                      {todo.completed ? (
                        <TaskAltIcon fontSize="medium" />
                      ) : (
                        <RadioButton fontSize="medium" />
                      )}
                    </IconButton>
                  </Box>

                  <Box sx={{ textAlign: 'left', paddingY: 1, flexGrow: 1}}>
                    <Typography
                      variant="h6"
                      color={todo.completed?  "disabled": "secondary"}
                      sx={{ textDecoration: todo.completed? 'line-through' : 'none', fontSize: 22, fontWeight: 'bold'}}
                    >
                      {todo.tittle}
                    </Typography>
                    {todo.description ? (
                      <Typography
                        variant="caption"
                        sx={{ paddingX: 3, fontSize: 16 }}
                      >
                        {todo.description}
                      </Typography>
                    ) : null}
                  </Box>

                  <Box sx={{ display: 'flex', gap: 2, placeContent: 'center' }}>
                    <IconButton onClick={() => DeletTask(todo.id)}>
                      <DeleteOutlineIcon
                        color="primary"
                        sx={{ height: '100%' }}
                        fontSize="large"
                      />
                    </IconButton>
                    <NewModal todo={todo}/>
                  </Box>
                </Paper>
              ))
            ) : (
              <Typography key={0}>You don't have any tasks</Typography>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}
