import React, { useEffect, useState } from "react";
import "./App.css";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [localTodos, setLocaltodos] = useState([]);

  useEffect(() => {
    getLocalTodos();
  }, []);

  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      const data = JSON.parse(localStorage.getItem("todos"));
      data.map((item) => localTodos.push(item));
      setTodos(localTodos);
    }
  };

  const saveLolcalTodos = (newTodo) => {
    localTodos.unshift(newTodo);
    localStorage.setItem("todos", JSON.stringify(localTodos));
  };

  const removeLocalTodos = (id) => {
    let newLocalData = localTodos.filter((localTodo) => localTodo.id !== id);
    setLocaltodos(newLocalData);
    localStorage.setItem("todos", JSON.stringify(newLocalData));
  };

  const updateLocalTodos = (id, newText) => {
    localTodos.map((localTodo) =>
      localTodo.id === id ? (localTodo.text = newText.text) : localTodo
    );
    localStorage.setItem("todos", JSON.stringify(localTodos));
  };

  const completeLocalTodos = (id) => {
    localStorage.setItem("todos", JSON.stringify(localTodos));
  };

  return (
    <div className="todo-app">
      <TodoList
        todos={todos}
        setTodos={setTodos}
        saveData={saveLolcalTodos}
        removeData={removeLocalTodos}
        updateData={updateLocalTodos}
        completeData={completeLocalTodos}
      />
    </div>
  );
}

export default App;
