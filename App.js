import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

function App() {
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem("tasks")) || []);
  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!input.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: input, done: false }]);
    setInput("");
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="app">
      <h1>🧠 Memory Assist</h1>

      <div className="card">
        <h2>Today</h2>
        <p>{new Date().toDateString()}</p>
      </div>

      <div className="card">
        <h2>Add Reminder</h2>
        <input 
          type="text" 
          placeholder="e.g. Take medication at 8 PM"
          value={input} 
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <div className="card">
        <h2>Your Reminders</h2>
        {tasks.length === 0 && <p>No reminders yet.</p>}
        {tasks.map(task => (
          <div key={task.id} className="task">
            <span style={{ textDecoration: task.done ? "line-through" : "none" }}>{task.text}</span>
            <div className="buttons">
              <button onClick={() => toggleTask(task.id)}>{task.done ? "Undo" : "Done"}</button>
              <button onClick={() => removeTask(task.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <h2>Orientation Help</h2>
        <p>You are safe. Take your time. 🌟</p>
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
