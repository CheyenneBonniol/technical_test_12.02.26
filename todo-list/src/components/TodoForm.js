import React, { useState } from "react";

export default function TodoForm({ addTodo }) {
  const [title, setTitle] = useState("");
  const [description, setDescript] = useState("");

  const onSubmit = () => {
    
  };

  return (
    <div>
    <h2>Create a new task</h2>
    <form>
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>
        description
        <textarea
          value={description}
          onChange={(e) => setDescript(e.target.value)}
        />
      </label>
      <button onClick={onSubmit}>Submit</button>
    </form>
    </div>
  );
}
