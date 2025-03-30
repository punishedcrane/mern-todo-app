import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = "https://mern-todo-app-1-m01y.onrender.com/api/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    axios.get(API_URL).then((res) => setTodos(res.data));
  }, []);

  const addTodo = async () => {
    if (text.trim() === "") return;
    const res = await axios.post(API_URL, { text });
    setTodos([...todos, res.data]);
    setText("");
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Todo List</h2>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a task..."
          />
          <button className="btn btn-primary" onClick={addTodo}>
            Add
          </button>
        </div>
        <ul className="list-group">
          {todos.map((todo) => (
            <li key={todo._id} className="list-group-item d-flex justify-content-between align-items-center">
              {todo.text}
              <button className="btn btn-danger btn-sm" onClick={() => deleteTodo(todo._id)}>
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;