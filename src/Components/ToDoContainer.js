import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Route, Switch } from 'react-router-dom';
import Header from './Header';
import InputToDo from './InputToDo';
import ToDoList from './ToDoList';
import About from './pages/About';
import NotMatch from './pages/NoMatch';
import Navbar from './Navbar';

const ToDoContainer = () => {
  function getInitialToDos() {
    // getting stored items
    const temp = localStorage.getItem('todos');
    const savedToDos = JSON.parse(temp);
    return savedToDos || [];
  }

  const [todos, setToDos] = useState(getInitialToDos());

  const handleChange = (id) => {
    setToDos((prevState) => prevState.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    }));
  };

  const delToDo = (id) => {
    setToDos([...todos.filter((todo) => todo.id !== id)]);
  };

  const addToDoItem = (title) => {
    const newToDo = {
      id: uuidv4(),
      title,
      completed: false,
    };
    setToDos([...todos, newToDo]);
  };

  const setUpdate = (updatedTitle, id) => {
    setToDos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.title = updatedTitle;
        }
        return todo;
      }),
    );
  };

  useEffect(() => {
    console.log('test run');
    // getting stored items
    const temp = localStorage.getItem('todos');
    const loadedToDos = JSON.parse(temp);

    if (loadedToDos) {
      setToDos(loadedToDos);
    }
  }, []);

  useEffect(() => {
    // storing todos items
    const temp = JSON.stringify(todos);
    localStorage.setItem('todos', temp);
  }, [todos]);

  useEffect(() => {
    console.log('test run');

    // getting stored items
    const temp = localStorage.getItem('todos');
    const loadedToDos = JSON.parse(temp);

    if (loadedToDos) {
      setToDos(loadedToDos);
    }
  }, []);

  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <div className="container">
            <div className="inner">
              <Header />
              <InputToDo addToDoProps={addToDoItem} />
              <ToDoList
                todos={todos}
                handleChangeProps={handleChange}
                deleteToDoProps={delToDo}
                setUpdate={setUpdate}
              />
            </div>
          </div>
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="*">
          <NotMatch />
        </Route>
      </Switch>
    </>
  );
};

export default ToDoContainer;
