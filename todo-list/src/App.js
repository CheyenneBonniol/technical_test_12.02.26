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

  const [inputState, setInputState] = useState("");
  const handleChange = (e) => {
    //setInputState(e.target.value);
    console.log(e.target.closest('.uniqueTask'));
    e.target.closest('.uniqueTask').classList.add(e.target.value)
  };




  return (
    <div>
      <h1>To-Do List</h1>
      <div className="container">
        <div className="addTask">
          <h2>Create a new task</h2>
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

        <div className="allTasks">
          <h2>Tasks</h2>
          <ul>
            {tasks.map((t, index) => (
              <div className="uniqueTask">
                <li key={index}>
                  <span>{t}</span>
                </li>
                <div className="crud">
                  <label>
                    <select key={index} name="state" onChange={handleChange}>
                      <option value="todo">To Do</option>
                      <option value="inProgress">In Progress</option>
                      <option value="done">Done</option>
                    </select>
                  </label>
                  <button>✏️</button>
                  <button onClick={() => removeTask(index)}>❌</button>
                </div>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
