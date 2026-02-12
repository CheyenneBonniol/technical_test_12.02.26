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
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  // filters
  const [filterAll, setFilterAll] = useState<boolean>(true);
  const [filterTodo, setFilterTodo] = useState<boolean>(false);
  const [filterInProgress, setFilterInProgress] = useState<boolean>(false);
  const [filterDone, setFilterDone] = useState<boolean>(false);
  const [filterCategorie, setFilterCategorie] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "none">("none");

  // Recovery of tasks
  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("tasks") || "[]",
    ) as ModelTask[];
    setTasks(saved);
  }, []);

  // Saved
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);


  function getUniqueCategories(): string[] {
    const categories = tasks.map((task) => task.categorie.toLowerCase());
    return Array.from(new Set(categories)).sort();
  }

  function addTask(): void {
    if (taskTitle.trim() === "") return;

    const newTask: ModelTask = {
      id: Date.now(),
      title: taskTitle,
      state: "Todo",
      categorie: taskCategorie.trim() || "Général",
      date: taskDate,
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
    state: "Todo" | "Done" | "InProgress",
    categorie: string,
    date: string,
  ) {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, title, state, categorie, date } : t,
      ),
    );
  }

  function SubDate() {
    let tgDate = new Date();
    tgDate.setDate(tgDate.getDate());
    return tgDate.toISOString().split("T")[0];
  }

  function getFilteredTasks(): ModelTask[] {
    let filtered = tasks;

    if (!filterAll) {
      filtered = filtered.filter((task) => {
        if (filterTodo && task.state === "Todo") return true;
        if (filterInProgress && task.state === "InProgress") return true;
        if (filterDone && task.state === "Done") return true;
        return false;
      });
    }

    if (filterCategorie !== "all") {
      filtered = filtered.filter(
        (task) =>
          task.categorie.toLowerCase() === filterCategorie.toLowerCase(),
      );
    }

    return filtered;
  }

  function handleAllChange(checked: boolean) {
    setFilterAll(checked);
    if (checked) {
      setFilterTodo(false);
      setFilterInProgress(false);
      setFilterDone(false);
    }
  }

  function handleFilterChange(
    filter: "Todo" | "InProgress" | "Done",
    checked: boolean,
  ) {
    if (checked) {
      setFilterAll(false);
    }

    if (filter === "Todo") setFilterTodo(checked);
    if (filter === "InProgress") setFilterInProgress(checked);
    if (filter === "Done") setFilterDone(checked);

    const allUnchecked =
      (filter === "Todo" ? !checked : !filterTodo) &&
      (filter === "InProgress" ? !checked : !filterInProgress) &&
      (filter === "Done" ? !checked : !filterDone);

    if (allUnchecked) {
      setFilterAll(true);
    }
  }

  function getSortedTasks(tasksToSort: ModelTask[]): ModelTask[] {
    if (sortOrder === "none") return tasksToSort;

    return [...tasksToSort].sort((a, b) => {
      if (!a.date && !b.date) return 0;
      if (!a.date) return 1;
      if (!b.date) return -1;

      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();

      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
  }

  function toggleSortOrder() {
    if (sortOrder === "none") {
      setSortOrder("asc");
    } else if (sortOrder === "asc") {
      setSortOrder("desc");
    } else {
      setSortOrder("none");
    }
  }

  function handleDragStart(index: number) {
    dragItem.current = index;
    setDraggingIndex(index);
  }

  function handleDragEnter(index: number) {
    dragOverItem.current = index;
  }

  function handleDragEnd() {
    if (dragItem.current === null || dragOverItem.current === null) return;

    const copyListItems = [...tasks];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);

    dragItem.current = null;
    dragOverItem.current = null;
    setDraggingIndex(null);

    setTasks(copyListItems);
  }

  const [isLight, setIsLight] = useState<boolean>(false);
  function changeTheme() {
    document.querySelector("html")?.classList.toggle("htmlLight");
    setIsLight(!isLight);
  }

  const filteredTasks = getSortedTasks(getFilteredTasks());
  const uniqueCategories = getUniqueCategories();

  return (
    <div>
      <h1 className={isLight ? "h1Light" : ""}>
        To-Do List
        <button className={isLight ? "buttonLight" : ""} onClick={changeTheme}>
          Change Theme
        </button>
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
            <input
              type="date"
              value={taskDate}
              min={SubDate()}
              onChange={(e) => setTaskDate(e.target.value)}
            />
          </label>

          <label>
            Category
            <input
              type="text"
              placeholder="add a categorie"
              value={taskCategorie}
              onChange={(e) => setTaskCategorie(e.target.value)}
            />
          </label>
          <button className={isLight ? "buttonLight" : ""} onClick={addTask}>
            Add
          </button>
        </div>
        <div className="TasksGeneral">
          <div className="search">
            <fieldset>
              <legend>Sort & Filter</legend>
              <button
                className={isLight ? "buttonLight" : ""}
                onClick={toggleSortOrder}
              >
                {sortOrder === "none" && "Sort by Date"}
                {sortOrder === "asc" && "Date ↑ (Oldest)"}
                {sortOrder === "desc" && "Date ↓ (Newest)"}
              </button>

              <label>
                Category
                <select
                  value={filterCategorie}
                  onChange={(e) => setFilterCategorie(e.target.value)}
                  className={isLight ? "selectLight" : ""}
                >
                  <option value="all">All Categories</option>
                  {uniqueCategories.map((cat, index) => (
                    <option key={index} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </label>
            </fieldset>
          </div>
          <div className={`allTasks ${isLight ? "containerLight" : ""}`}>
            <div className="filters">
              <fieldset>
                <legend>State</legend>
                <label className="filter-all">
                  <input
                    type="checkbox"
                    checked={filterAll}
                    onChange={(e) => handleAllChange(e.target.checked)}
                  />
                  All
                </label>
                <label className="filter-todo">
                  <input
                    type="checkbox"
                    checked={filterTodo}
                    onChange={(e) =>
                      handleFilterChange("Todo", e.target.checked)
                    }
                  />
                  To Do
                </label>
                <label className="filter-inprogress">
                  <input
                    type="checkbox"
                    checked={filterInProgress}
                    onChange={(e) =>
                      handleFilterChange("InProgress", e.target.checked)
                    }
                  />
                  In Progress
                </label>
                <label className="filter-done">
                  <input
                    type="checkbox"
                    checked={filterDone}
                    onChange={(e) =>
                      handleFilterChange("Done", e.target.checked)
                    }
                  />
                  Done
                </label>
              </fieldset>
            </div>
            <h2>Tasks</h2>
            <ul>
              {filteredTasks.map((task, index) => (
                <li
                  key={task.id}
                  draggable
                  className={draggingIndex === index ? "dragging" : ""}
                  onDragStart={() => handleDragStart(index)}
                  onDragEnter={() => handleDragEnter(index)}
                  onDragEnd={handleDragEnd}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <TodoTask
                    task={task}
                    removeTask={() => removeTask(task.id)}
                    changeTask={(title, state, categorie, date) =>
                      changeTask(task.id, title, state, categorie, date)
                    }
                    index={index}
                    categories={uniqueCategories}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
