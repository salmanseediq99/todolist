export default function Footer({ item }) {
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
