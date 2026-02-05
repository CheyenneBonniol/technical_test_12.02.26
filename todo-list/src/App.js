import React, { useState, useEffect, useRef } from "react";
import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const isFirstRender = useRef(true);

  // recuperation des taches
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(saved);
  }, []);

  // Sauvegarde à chaque modification sauf chargement de la page 
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, task]);
    setTask("");
  };

  const removeTask = (index) => {
    const news = [...tasks];
    news.splice(index, 1);
    setTasks(news);
  };

  return (
    <div className="container">
      <h1>Todo - List</h1>
      <div className="ajout-zone">
        <label>
          New Task
          <input
            type="text"
            placeholder="add a new task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </label>
        <button onClick={addTask}>Add</button>
      </div>
      <ul>
        {tasks.map((tache, index) => (
          <li key={index}>
            <span>{tache}</span>
            <button onClick={() => removeTask(index)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

