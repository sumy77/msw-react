import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

function App() {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState<Todo | null>(null);

  useEffect(() => {
    fetch("https://dummyjson.com/todos")
      .then((res) => res.json())
      .then((res) => setTodos(res.todos));
  }, []);

  async function loadFirstTodo() {
    const todoData = await fetch(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    const result = await todoData.json();
    setTodo(result);
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <button onClick={loadFirstTodo}>Load First Todo</button>
      {todos.length && <div>Todo List: {todos.length}</div>}
      {todo && <p>{todo.title}</p>}
    </>
  );
}

export default App;
