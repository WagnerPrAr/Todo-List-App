import { TextField, Box, Typography, Button, Paper, IconButton } from '@mui/material';
import { FormControl } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RadioButton from '@mui/icons-material/RadioButtonUnchecked';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import EditIcon from '@mui/icons-material/Edit';
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

  const idRef = useRef(todosList.length + 1);

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

  function DeletTask(id: number){
    const newTodosList = todosList.filter((todo) => todo.id !== id);
    setTodosList(newTodosList);
  }

  function EditTask(id: number){
      console.log(id);
  }

  function ToggleComplet(id: number){
      const task = todosList.find((todo) => todo.id === id);
      if(task){
        const newTodo = todosList.map((todo) => (
          todo.id === id ? { ...todo, completed: !todo.completed } : {...todo}
        ));
        setTodosList(newTodo);
      }
  }

  return (
    <>
      <FormControl
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 2,
          padding: 5,
          backgroundColor: '#313332',
          borderRadius: 4,
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
          Add Todo
        </Typography>
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
                  sx={{ display:'flex', paddingX: 4}}
                >
                  <Box sx={{alignContent:'center',  marginRight:4}}>
                    <IconButton onClick={() => ToggleComplet(todo.id)}>
                      {todo.completed? <TaskAltIcon fontSize='medium'/>: <RadioButton fontSize='medium'/>}
                    </IconButton>
                  </Box>
                  
                  <Box sx={{ textAlign: 'left', paddingY: 1, flexGrow: 1 }}>
                  <Typography variant='h6' color='secondary' sx={{fontSize: 22, fontWeight:'bold'}}>{todo.tittle}</Typography>
                  {todo.description ? (
                    <Typography variant='caption' sx={{paddingX: 3, fontSize: 16}}>{todo.description}</Typography>
                  ) : null}
                  </Box>

                  <Box sx={{ display:'flex', gap:2, placeContent:'center'}}>
                    <IconButton  onClick={() => DeletTask(todo.id)}>
                      <DeleteOutlineIcon  color='primary' sx={{ height:'100%'}} fontSize='large'/>
                    </IconButton>
                    <IconButton onClick={() => EditTask(todo.id)}>
                      <EditIcon color='primary' sx={{height:'100%'}} fontSize='large'/>
                    </IconButton>
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
