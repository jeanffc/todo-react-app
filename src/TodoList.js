import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import TodoItem from "./TodoItem";
import NewTodoForm from "./NewTodoForm";

import "./TodoList.css";
import axios from "axios";

function TodoList() {
  const [todos, setTodos] = useState([
    { id: uuid(), task: "test 1", completed: false },
    { id: uuid(), task: "test 2", completed: true }
  ]);

  useEffect(() => {
    get();
  }, [])

  const get = async () => {
    const response = await axios.get('https://crudcrud.com/Dashboard/8bbc7e551af24a6ca29e44628db36f4e/todos');
    setTodos(response.data);
  }


  const create = newTodo => {
    setTodos([...todos, newTodo]);
  };

  const remove = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const update = (id, updtedTask) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, task: updtedTask };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const toggleComplete = id => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const todosList = todos.map(todo => (
    <TodoItem
      toggleComplete={toggleComplete}
      update={update}
      remove={remove}
      key={todo.id}
      todo={todo}
    />
  ));

  return (
    <div className="TodoList">
      <h1>
        Todo List <span>A simple React Todo List App</span>
      </h1>
      <NewTodoForm createTodo={create} />
      <ul>{todosList}</ul>
    </div>
  );
}

export default TodoList;
