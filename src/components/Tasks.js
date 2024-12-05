export default function Tasks({ tasks, onDelete, onUpdate }) {
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
