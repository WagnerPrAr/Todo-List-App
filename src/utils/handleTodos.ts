import { useRef } from "react";

  export const addTask = (tittle, description, todosList, setTodosList, setTittle, setDescription) => {

  let idRef = todosList.length + 1;


    if (tittle) {
      setTodosList([
        ...todosList,
        {
          id: idRef++,
          tittle: tittle,
          description: description,
          completed: false,
        },
      ]);
      setTittle('');
      setDescription('');
      console.log(todosList);
    } else {
      console.log('Please fill at least the tittle');
    }
  }

  export const deletTask = (id: number, todosList, setTodosList) => {
    const newTodosList = todosList.filter((todo) => todo.id !== id);
    setTodosList(newTodosList);
  }

    export const toggleComplet = (id: number, todosList, setTodosList) => {
    const task = todosList.find((todo) => todo.id === id);
    if (task) {
      const newTodo = todosList.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : { ...todo },
      );
      setTodosList(newTodo);
    }
  }