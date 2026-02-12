import React, { useState } from "react";
import ModelTask from "../models/ModelTask";

interface TodoTaskProps {
  task: ModelTask;
  removeTask: () => void;
  changeTask: (
    title: string,
    state: "Todo" | "Done" | "InProgress",
    categorie: string,
    date: string,
  ) => void;
  index: number;
  categories: string[];
}

export default function TodoTask(props: TodoTaskProps) {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [newTaskTitle, setNewTaskTitle] = useState<string>(props.task.title);
  const [newTaskState, setNewTaskState] = useState<
    "Todo" | "InProgress" | "Done"
  >(props.task.state);
  const [newTaskCategorie, setNewTaskCategorie] = useState<string>(props.task.categorie);
  const [newTaskDate, setNewTaskDate] = useState<string>(props.task.date);

  function removeT() {
    props.removeTask();
  }

  function edit() {
    setIsEdit(true);
  }

  function saved(stateOverride?: "Todo" | "InProgress" | "Done") {
    const stateToSave = stateOverride ?? newTaskState;
    if (newTaskTitle.trim() === "") {
      setNewTaskTitle(props.task.title);
    }
    props.changeTask(newTaskTitle, stateToSave, newTaskCategorie, newTaskDate);
    setIsEdit(false);
  }

  function changeTaskTest(e: React.ChangeEvent<HTMLSelectElement>) {
    const newState = e.target.value as "Todo" | "InProgress" | "Done";
    setNewTaskState(newState);
    if (!isEdit) {
      saved(newState);
    }
  }

  function cancel() {
    setIsEdit(false);
    setNewTaskTitle(props.task.title);
    setNewTaskCategorie(props.task.categorie);
    setNewTaskDate(props.task.date);
  }

  return (
    <div className={`uniqueTask ${newTaskState}`}>
      {isEdit === true && (
        <form>
          <input
            type="text"
            placeholder={props.task.title}
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Category"
            value={newTaskCategorie}
            onChange={(e) => setNewTaskCategorie(e.target.value)}
          />
          <button className="buttonCrud" type="button" onClick={() => saved()}>
            Saved
          </button>
          <button className="buttonCrud" type="button" onClick={cancel}>
            Cancel
          </button>
        </form>
      )}
      {isEdit === false && (
        <span>
          {props.task.date && (
            <span className="taskDate">{props.task.date}</span>
          )}
          {props.task.title}
          <span className="taskCategorie"> #{props.task.categorie.trim().toLowerCase().charAt(0).toUpperCase() + props.task.categorie.trim().toLowerCase().slice(1)}</span>
        </span>
      )}
      <div className="crud">
        <label>
          <select
            key={props.index}
            name="state"
            value={newTaskState}
            onChange={changeTaskTest}
          >
            <option value="Todo">To Do</option>
            <option value="InProgress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </label>
        <button onClick={edit}>✏️</button>
        <button onClick={removeT}>❌</button>
      </div>
    </div>
  );
}