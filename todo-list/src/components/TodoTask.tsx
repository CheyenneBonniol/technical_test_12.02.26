import React, { useState } from "react";
import ModelTask from "../models/ModelTask";

interface TodoTaskProps {
  task: ModelTask;
  removeTask: () => void;
  changeTask: (
    title: string,
    state: "Todo" | "Done" | "In Progress",
    categorie: string,
    date: string,
  ) => void;
  index: number;
}

export default function TodoTask(props: TodoTaskProps) {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [newTaskTitle, setNewTaskTitle] = useState<string>(props.task.title);
  const [newTaskState, setNewTaskState] = useState<
    "Todo" | "In Progress" | "Done"
  >(props.task.state);

  const [newTaskCategorie] = useState<string>(props.task.categorie);
  const [newTaskDate] = useState<string>(props.task.date);

  function removeT() {
    props.removeTask();
  }

  function edit() {
    setIsEdit(true);
  }

  function saved(stateOverride?: "Todo" | "In Progress" | "Done") {
    const stateToSave = stateOverride ?? newTaskState;
    if (newTaskTitle.trim() === "") {
      setNewTaskTitle(props.task.title);
    }
    props.changeTask(newTaskTitle, stateToSave, newTaskCategorie, newTaskDate);
    setIsEdit(false);
  }

  function changeTaskTest(e: React.ChangeEvent<HTMLSelectElement>) {
    const newState = e.target.value as "Todo" | "In Progress" | "Done";
    setNewTaskState(newState);
    if (!isEdit) {
      saved(newState);
    }
  }

  function cancel() {
    setIsEdit(false);
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
          <button className="buttonCrud" onClick={() => saved()}>
            Saved
          </button>
          <button className="buttonCrud" onClick={cancel}>
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
        </span>
      )}{" "}
      <div className="crud">
        <label>
          <select
            key={props.index}
            name="state"
            value={newTaskState}
            onChange={changeTaskTest}
          >
            <option value="todo">To Do</option>
            <option value="inProgress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </label>
        <button onClick={edit}>✏️</button>
        <button onClick={removeT}>❌</button>
      </div>
    </div>
  );
}
