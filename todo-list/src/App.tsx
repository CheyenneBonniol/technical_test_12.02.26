import React, { useState, useEffect, useRef } from "react";
import TodoTask from "./components/TodoTask";
import "./App.css";
import ModelTask from "./models/ModelTask";

export default function App() {
  const [tasks, setTasks] = useState<ModelTask[]>([]);
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [taskCategorie, setTaskCategorie] = useState<string>("");
  const [taskDate, setTaskDate] = useState<string>("");
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
      id: tasks.length + 1,
      title: taskTitle,
      state: "Todo",
      categorie: taskCategorie.trim() || "Général",
      date: taskDate
    };

    setTasks([...tasks, newTask]);
    setTaskTitle("");
    setTaskCategorie("");
    setTaskDate("");
  }

  function removeTask(id: number): void {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function changeTask(
    id: number,
    title: string,
    state: "Todo" | "Done" | "In Progress",
    categorie: string,
    date:string
  ) {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, title, state, categorie, date } : t)),
    );
  }
const [isLight, setIsLight] = useState<boolean>(false);
  function changeTheme() {
    document.querySelector("html")?.classList.toggle("htmlLight");
    setIsLight(!isLight);
  
  } 

  return (
    <div>
      <h1 className={isLight ? "h1Light" : ""}>
        To-Do List<button className={isLight ? "buttonLight" : ""} onClick={changeTheme}>Change Theme</button>
      </h1>
      <div className="container">
        <div className={`addTask ${isLight ? "containerLight" : ""}`}>
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
            Due date
            <input type="date" value={taskDate} onChange={(e) => setTaskDate(e.target.value)} />
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
          <button className={isLight ? "buttonLight" : ""} onClick={addTask}>Add</button>
        </div>
        <div className={`allTasks ${isLight ? "containerLight" : ""}`}>
          <h2>Tasks</h2>
          <ul>
            {tasks.map((task, index) => (
              <TodoTask
                task={task}
                removeTask={() => removeTask(task.id)}
                changeTask={(title, state, categorie, date) =>
                  changeTask(task.id, title, state, categorie, date)
                }
                index={index}
                key={index}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
