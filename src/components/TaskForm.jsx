import React, { useEffect, useState } from "react";

export default function TaskForm({ addTask, editingTask, updateTask }) {
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    date: "",
    priority: "Medium",
  });

  const [error, setError] = useState({});

  useEffect(() => {
    if (editingTask) {
      setFormData(editingTask);
    }
  }, [editingTask]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError({ ...error, [e.target.name]: "" });
  };

  const validate = () => {
    const newError = {};

    if (!formData.title.trim()) {
      newError.title = "Task title is required";
    } else if (formData.title.length < 6) {
      newError.title = "Minimum 6 characters required";
    }

    if (!formData.desc.trim()) {
      newError.desc = "Description is required";
    }

    if (!formData.date) {
      newError.date = "Due date is required";
    }

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      if (editingTask) {
        updateTask(formData);
      } else {
        addTask(formData);
      }

      setFormData({
        title: "",
        desc: "",
        date: "",
        priority: "Medium",
      });
    }
  };

  return (
    <div className="add-task-card">
      <h2>{editingTask ? "Update Task" : "Add New Task"}</h2>

      <form>
        <div>
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={formData.title}
            onChange={handleChange}
          />
          {error.title && <span className="error-msg">{error.title}</span>}
        </div>

        <div>
          <textarea
            name="desc"
            placeholder="Description"
            rows="3"
            value={formData.desc}
            onChange={handleChange}
          />
          {error.desc && <span className="error-msg">{error.desc}</span>}
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ flex: 1 }}>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
            {error.date && <span className="error-msg">{error.date}</span>}
          </div>

          <div style={{ flex: 1 }}>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="Low">Low Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="High">High Priority</option>
            </select>
          </div>
        </div>

        <div className="form-action" style={{ display: "flex", gap: "10px" }}>
          <button className="btn-primary" onClick={handleSubmit}>
            {editingTask ? "Update" : "Add"} Task
          </button>

          <button
            type="button"
            className="btn-secondary"
            onClick={() =>
              setFormData({
                title: "",
                desc: "",
                date: "",
                priority: "Medium",
              })
            }
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}