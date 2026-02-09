import React, { useState, useEffect, useRef } from "react";
import TodoTask from "./components/TodoTask";
import "./App.css";
import ModelTask from "./models/ModelTask";

export default function App() {
  const [tasks, setTasks] = useState<ModelTask[]>([]);
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [taskCategorie, setTaskCategorie] = useState<string>("");
  const isFirstRender = useRef<boolean>(true);

  // Récupération des tâches
  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("tasks") || "[]",
    ) as ModelTask[];
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

  function addTask(): void {
    if (taskTitle.trim() === "") return;

    // Créer une nouvelle tâche selon le modèle ModelTask
    const newTask: ModelTask = {
      id: tasks.length + 1 ,
      title: taskTitle,
      state: "Todo",
      categorie: taskCategorie.trim() || "Général",
    };

    setTasks([...tasks, newTask]);
    setTaskTitle("");
    setTaskCategorie("");
  }

  function removeTask(id: number): void {
    setTasks(tasks.filter((task) => task.id !== id));
  }

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
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
          </label>
          <label>
            Categorie
            <input
              type="text"
              placeholder="add a categorie"
              value={taskCategorie}
              onChange={(e) => setTaskCategorie(e.target.value)}
            />
          </label>
          <button onClick={addTask}>Add</button>
        </div>
        <div className="allTasks">
          <h2>Tasks</h2>
          <ul>
            {tasks.map((task, index) => (
              
                  <TodoTask
                    task={task}
                    removeTask={() => removeTask(task.id)}
                    index={index}
                  />
                
              
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
