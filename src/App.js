import { useState } from "react";

export default function App() {
  const [item, setItem] = useState([]);
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;
  if (sortBy === "input") sortedItems = item;

  if (sortBy === "description")
    sortedItems = item
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "completed")
    sortedItems = item
      .slice()
      .sort((a, b) => Number(a.completed) - Number(b.completed));
  if (sortBy === "dateAndTime") {
    sortedItems = item.slice().sort((a, b) => {
      const dateTimeA = new Date(`${a.date}T${a.time}`);
      const dateTimeB = new Date(`${b.date}T${b.time}`);
      return dateTimeA - dateTimeB; // Ascending order
    });
  }
  function addItem(item) {
    setItem((items) => [...items, item]);
  }

  function deleteItem(id) {
    setItem((items) => items.filter((item) => item.id !== id));
  }

  function updateItem(id) {
    setItem((items) =>
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }

  function clearList() {
    if (item.length === 0) return;
    const confirm = window.confirm("Are You Sure You Want To Clear The List?");
    if (confirm) setItem([]);
  }
  return (
    <>
      <Footer item={item} />
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort By Input</option>
          <option value="description">Sort By Description</option>
          <option value="completed">Sort By Completed</option>
          <option value="dateAndTime">Sort By Date & Time</option>
        </select>
        <button className="hide" onClick={clearList}>
          Clear List
        </button>
      </div>

      <h1 className="heading">To Do List</h1>
      <Form onAddItem={addItem} clearList={clearList} />
      <ToDoList
        items={item}
        onDelete={deleteItem}
        onUpdate={updateItem}
        sortedItems={sortedItems}
      />
    </>
  );
}

function Form({ onAddItem, clearList }) {
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

function ToDoList({ items, onDelete, onUpdate, sortedItems }) {
  return (
    <>
      <div className="container">
        {sortedItems.map((task) => (
          <Tasks
            tasks={task}
            onDelete={onDelete}
            onUpdate={onUpdate}
            key={task.id}
          />
        ))}
      </div>
    </>
  );
}

function Tasks({ tasks, onDelete, onUpdate }) {
  const date = new Date(tasks.date);
  const formattedDate = new Intl.DateTimeFormat("en-GB").format(date);

  return (
    <div className={`todo-list ${tasks.completed ? "completed" : ""}`}>
      <div className="todo">
        <h3>{tasks.description}</h3>
        <input
          type="checkbox"
          className="check"
          checked={tasks.completed}
          onChange={() => {
            onUpdate(tasks.id);
          }}
        />
        <button className="delete" onClick={() => onDelete(tasks.id)}>
          ❌
        </button>
      </div>
      <div className="timing">
        <p className="date">{formattedDate}</p>
        <p className="time">⏲ {tasks.time}</p>
      </div>
    </div>
  );
}

function Footer({ item }) {
  const numItems = item.length;
  const todayDate = new Date().toISOString().split("T")[0];

  // Filter tasks for today
  const todayTasks = item.filter((task) => task.date === todayDate);

  // Check if all today's tasks are completed
  const allTodayTasksCompleted =
    todayTasks.length > 0 && todayTasks.every((task) => task.completed);
  if (!item.length)
    return <p className="footer-text">Start Adding Tasks To Your List 📃</p>;
  return (
    <footer
      style={
        allTodayTasksCompleted
          ? { backgroundColor: "green", color: "#fff" }
          : {}
      }
    >
      <p className="footer-text">
        {allTodayTasksCompleted
          ? "You Finished All Your Tasks For Today 🎊🎉"
          : `Keep going you have ${numItems} tasks remaining `}
      </p>
    </footer>
  );
}
