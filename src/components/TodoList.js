import React, { useState, useEffect } from "react";

import TodoItem from "./TodoItem";
import NewTodoForm from "./NewTodoForm";

import { addItem, deleteItem, getList, updateItemComplete, updateItemTask } from "../services/firestore";

import "./TodoList.css";

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    get();
  }, [])

  const get = async () => {
    const data = await getList();
    setTodos(data);
  }

  const create = async (newTodo) => {
    const todo = await addItem(newTodo.task, newTodo.completed);
    setTodos([...todos, todo]);
  };

  const remove = async (id) => {
    await deleteItem(id);
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const update = async (id, updtedTask) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, task: updtedTask };
      }
      return todo;
    });
    await updateItemTask(id, updtedTask);
    setTodos(updatedTodos);
  };

  const toggleComplete = async (id) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    await updateItemComplete(id);
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
        Todo List <span>Study Project<br />(React + Firebase/Firestore + Sign in with Google)</span>
      </h1>
      <NewTodoForm createTodo={create} />
      <ul>{todosList}</ul>
    </div>
  );
}

export default TodoList;
