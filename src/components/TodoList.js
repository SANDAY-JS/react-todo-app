import React, { useState, useContext } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";

function TodoList({
  todos,
  setTodos,
  saveData,
  removeData,
  updateData,
  completeData,
}) {
  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];
    setTodos(newTodos);
    saveData(todo);
  };

  //   Edit Btn
  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );

    updateData(todoId, newValue);
  };

  //   Remove Btn
  const removeTodo = (id) => {
    const removeArr = [...todos].filter((todo) => todo.id !== id);

    setTodos(removeArr);
    removeData(id);
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id == id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
    completeData(id);
  };

  return (
    <div>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} />
      {todos.map((todo, index) => (
        <Todo
          todo={todo}
          index={index}
          completeTodo={completeTodo}
          removeTodo={removeTodo}
          updateTodo={updateTodo}
        />
      ))}
    </div>
  );
}

export default TodoList;
