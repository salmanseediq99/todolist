import { useState } from "react";
import Form from "./Form";
import ToDoList from "./ToDoList";
import Footer from "./Footer";

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
