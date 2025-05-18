import { TextField, Box, Typography, Button} from '@mui/material';
import { FormControl } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState, useRef } from 'react';

export default function Todos(){

  interface Itask {
    id: number;
    tittle: string | number;
    description: string;
    completed: boolean;
  }

  const [tittle, setTittle] = useState<string | number>("");
  const [description, setDescription] = useState<string>("");
  const [todosList, setTodosList] = useState<Itask[]>([]);

  const idRef = useRef(0);

   function handleSubmmit(){
      if(tittle){
        setTodosList([...todosList,
          {id: idRef.current++,
          tittle:tittle,
          description:description,
          completed:false,}
        ])
        setTittle("");
        setDescription("");
      } else{
        console.log("Please fill at least the tittle");
      }
    

  }

  return(
    <>
        <FormControl sx={{display: 'flex', flexDirection: 'row', justifyContent: "center", gap: 2, padding:5, backgroundColor: "#313332", borderRadius: 4}}>
          <Typography variant='h2' sx={{fontWeight: 'bold'}}>Add Todo</Typography>
          <TextField fullWidth color='secondary' label="Tittle" required id="tittle" value={tittle} onChange={e => setTittle((e.target as HTMLInputElement).value)}/>
          <TextField fullWidth color='secondary' label="Description" variant="outlined" required id="description" value={description} onChange={e => setDescription((e.target as HTMLInputElement).value)}/>

          <Button onClick={() => {handleSubmmit()}} color='secondary' aria-label="add" variant="contained">
            <AddIcon fontSize='large'/>
          </Button>
        </FormControl>

        <Box>
              <Box>
      <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
        Todos
      </Typography>

      <Box>
        {
          todosList.length > 0 ? (
            todosList.map((todo) => (
              <Box key={todo.id}>
                <Typography >{todo.tittle}</Typography>
                {todo.description?<Typography >{todo.description}</Typography> : null}
              </Box>
            ))
          ) : <Typography key={0}>You don't hav e any tasks</Typography>
        }
      </Box>
    </Box>
        </Box>
    </>
  )
}