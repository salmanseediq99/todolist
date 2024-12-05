import { useState } from "react";

export default function Form({ onAddItem, clearList }) {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  function handleForm(e) {
    e.preventDefault();

    if (!description) return;
    const newItem = {
      id: Date.now(),
      description,
      date,
      time,
      completed: false,
    };
    onAddItem(newItem);
    setDescription("");
    setDate("");
    setTime("");
    console.log(newItem);
  }
  return (
    <div className="form">
      <form onSubmit={handleForm}>
        <input
          type="text"
          placeholder="...task"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <input
          type="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
        <input
          type="time"
          onChange={(e) => setTime(e.target.value)}
          value={time}
        />
        <button>Add Task</button>
        <button className="clear" onClick={clearList}>
          Clear List
        </button>
      </form>
    </div>
  );
}
