import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";

function Dashboard() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // FETCH TASKS
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/tasks");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ADD TASK
  const handleAddTask = async (newTask) => {
    const taskToAdd = { ...newTask, completed: false };

    try {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskToAdd),
      });

      const data = await response.json();
      setTasks((prev) => [...prev, data]);
      setShowForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("lData");
    localStorage.removeItem("authData");
    navigate("/login");
  };

  // EDIT TASK
  const editingTask = (task) => {
    setEditTask(task);
    setShowForm(true);
  };

  // UPDATE TASK
  const handleUpdateTask = async (updatedTask) => {
    try {
      await fetch(`http://localhost:3000/tasks/${updatedTask.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });

      setTasks((prev) =>
        prev.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );

      setEditTask(null);
      setShowForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE TASK
  const handleDeleteTask = async (id) => {
    try {
      await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "DELETE",
      });

      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  // COMPLETE / UNDO TASK
  const handleCompleteTask = async (id) => {
    const taskToggle = tasks.find((task) => task.id === id);
    if (!taskToggle) return;

    const updatedTask = {
      ...taskToggle,
      completed: !taskToggle.completed,
    };

    try {
      await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });

      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? updatedTask : task
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar
        title="Task Management"
        onLogout={handleLogout}
        isFormOpen={showForm}
        onAddTaskBtnClick={() => {
          setShowForm((prev) => !prev);
          setEditTask(null);
        }}
      />

      {showForm && (
        <TaskForm
          addTask={handleAddTask}
          editingTask={editTask}
          updateTask={handleUpdateTask}
        />
      )}

      <TaskList
        tasks={tasks}
        editingTask={editingTask}
        deletingTask={handleDeleteTask}
        handleCompleteTask={handleCompleteTask}
      />
    </div>
  );
}

export default Dashboard;
