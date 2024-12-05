import Tasks from "./Tasks";

export function ToDoList({ items, onDelete, onUpdate, sortedItems }) {
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
