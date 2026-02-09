import React, { useState } from "react";
import ModelTask from "../models/ModelTask";

interface TodoTaskProps {
  task: ModelTask;
  removeTask: () => void;
  index: number;
}

export default function TodoTask(props: TodoTaskProps) {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  function removeT() {
    props.removeTask();
  }

  function edit() {
    setIsEdit(true);
  }

  function cancel() {

    setIsEdit(false);

  }

  return (
    <div className="uniqueTask">
      {isEdit === true && (
        <form>
          <input type="text" placeholder={props.task.title} />
          <button className="buttonCrud">Saved</button>
          <button className="buttonCrud" onClick={cancel}>Cancel</button>
        </form>
      )}
      {isEdit === false && <span>{props.task.title}</span>}

      <div className="crud">
        <label>
          <select key={props.index} name="state">
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
