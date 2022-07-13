import React, { useReducer } from "react";
import { v4 as uuid } from "uuid";

import useUser from "../hooks/useUser";

import "./NewTodoForm.css";

function NewTodoForm({ task, createTodo }) {
  const user = useUser();
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      task: ""
    }
  );

  const handleChange = evt => {
    setUserInput({ [evt.target.name]: evt.target.value });
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const newTodo = { id: uuid(), task: userInput.task, completed: false };
    createTodo(newTodo);
    setUserInput({ task: "" });
  };

  return (
    <>
      {user ? (
        <form className="NewTodoForm" onSubmit={handleSubmit} >
          <label htmlFor="task">New todo</label>
          <input
            value={userInput.task}
            onChange={handleChange}
            id="task"
            type="text"
            name="task"
            placeholder="New Todo"
          />
          <button type="submit" disabled={!user}>Add Todo</button>
        </form>
      ) : (
        <p>
          Sign in to enable the functions
        </p>
      )}
    </>
  );
}

export default NewTodoForm;
