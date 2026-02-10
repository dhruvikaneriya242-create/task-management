import React from "react";

export default function TaskList({
  tasks,
  editingTask,
  deletingTask,
  handleCompleteTask,
}) {
  return (
    <div className="task-grid">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`task-card ${task.completed ? "completed" : ""}`}
          style={{ position: "relative" }}
        >
          <h3>{task.title}</h3>
          <p>{task.desc}</p>

          <div className="task-meta">
            <span>{task.date}</span>
            <span
              className={`priority-badge priority-${task.priority.toLowerCase()}`}
            >
              {task.priority}
            </span>
          </div>

          <div className="task-actions">
            <button
              className="btn-icon"
              style={{ background: "#00d2ff" }}
              title="Edit Task"
              disabled={task.completed}
              onClick={() => editingTask(task)}
            >
              ✏️
            </button>

            <button
              className="btn-icon"
              style={{ background: "#00b894" }}
              title="Complete / Undo"
              onClick={() => handleCompleteTask(task.id)}
            >
              {task.completed ? "↩️ Undo" : "✔️"}
            </button>

            <button
              className="btn-icon"
              style={{ background: "#ff416c" }}
              title="Delete Task"
              onClick={() => deletingTask(task.id)}
            >
              🗑️
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
