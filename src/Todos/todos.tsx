import {
  TextField,
  Box,
  Paper,
  FormControl,
  Typography,
  Button,
  IconButton,
} from '@mui/material';
import {Add, DeleteOutline, RadioButtonUnchecked, TaskAlt} from '@mui/icons-material';

import { useState } from 'react';
import {addTask, deletTask, toggleComplet} from '../utils/handleTodos';
import NewModal from '../components/Modal';

export default function Todos() {
  interface Itask {
    id: number;
    tittle: string | number;
    description: string;
    completed: boolean;
  };

  const [tittle, setTittle] = useState<string | number>('');

  const [description, setDescription] = useState<string>('');

  const [todosList, setTodosList] = useState<Itask[]>([]);

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
            onChange={(e) => setTittle(e.target.value)}
          />
          <TextField
            fullWidth
            color="secondary"
            label="Description"
            variant="outlined"
            required
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button
            onClick={() => {
              addTask(tittle, description, todosList, setTodosList, setTittle, setDescription);
            }}
            color="secondary"
            aria-label="add"
            variant="contained"
          >
            <Add fontSize="large" />
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
                  sx={{
                    backgroundColor: todo.completed ? 'grey' : 'primary',
                    display: 'flex',
                    paddingX: 4,
                  }}
                >
                  <Box sx={{ alignContent: 'center', marginRight: 4 }}>
                    <IconButton onClick={() => toggleComplet(todo.id, todosList, setTodosList)}>
                      {todo.completed ? (
                        <TaskAlt fontSize="medium" />
                      ) : (
                        <RadioButtonUnchecked fontSize="medium" />
                      )}
                    </IconButton>
                  </Box>

                  <Box sx={{ textAlign: 'left', paddingY: 1, flexGrow: 1 }}>
                    <Typography
                      variant="h6"
                      color={todo.completed ? 'disabled' : 'secondary'}
                      sx={{
                        textDecoration: todo.completed
                          ? 'line-through'
                          : 'none',
                        fontSize: 22,
                        fontWeight: 'bold',
                      }}
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
                    <IconButton onClick={() => deletTask(todo.id, todosList, setTodosList)}>
                      <DeleteOutline
                        color="primary"
                        sx={{ height: '100%' }}
                        fontSize="large"
                      />
                    </IconButton>
                    <NewModal todo={todo} todosList={todosList} setTodosList={setTodosList} />
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
