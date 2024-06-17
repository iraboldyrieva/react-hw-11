import React, { useState } from "react";
import styles from "./ToDo.module.css";
import Task from "../Task/Task";
import FilterTask from "../FilterTask/FilterTask";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

const ToDoList = ({
  todos,
  addTodo,
  updateTodo,
  deleteTodo,
  deleteAllTodos,
}) => {
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskDone, setNewTaskDone] = useState(false);
  const [filter, setFilter] = useState("All");
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleAddTask = () => {
    if (newTaskName.length < 3) {
      setError("Minimum symbol length - 3");
      return;
    } else if (newTaskName.length > 20) {
      setError("Maximum symbol length - 20");
      return;
    }

    const newTask = {
      title: newTaskName,
      description: newTaskDescription,
      checked: newTaskDone,
    };
    addTodo(newTask);
    setNewTaskName("");
    setNewTaskDescription("");
    setNewTaskDone(false);
    setError("");
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filterTasks = () => {
    let filteredTasks = todos;

    if (filter === "Active") {
      filteredTasks = filteredTasks.filter((task) => !task.checked);
    } else if (filter === "Done") {
      filteredTasks = filteredTasks.filter((task) => task.checked);
    }

    if (search) {
      filteredTasks = filteredTasks.filter((task) =>
        task.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    return filteredTasks;
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setNewTaskName(task.title);
    setNewTaskDescription(task.description);
    setNewTaskDone(task.checked);
  };

  const handleUpdateTask = () => {
    const updatedTask = {
      ...editingTask,
      title: newTaskName,
      description: newTaskDescription,
      checked: newTaskDone,
    };
    updateTodo(editingTask.id, updatedTask);
    setEditingTask(null);
    setNewTaskName("");
    setNewTaskDescription("");
    setNewTaskDone(false);
  };

  const filteredTask = filterTasks();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <>
          <button
            style={{
              border: "none",
              backgroundColor: "transparent",
              position: "absolute",
              top: 20,
              right: 20,
              fontSize: "24px",
            }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            =
          </button>
          {isMenuOpen && <BurgerMenu />}
        </>
        <h1 className={styles.title}>My ToDo</h1>
        <input
          className={styles.input}
          placeholder="New task"
          value={newTaskName}
          onChange={(e) => {
            setNewTaskName(e.target.value);
            setError("");
          }}
        />
        <input
          className={styles.input}
          placeholder="Task description"
          value={newTaskDescription}
          onChange={(e) => {
            setNewTaskDescription(e.target.value);
            setError("");
          }}
        />
        <button
          className={styles.addBtn}
          onClick={editingTask ? handleUpdateTask : handleAddTask}
        >
          {editingTask ? "Update" : "Add"}
        </button>

        <div className={styles.error}>{error}</div>
      </div>
      <div className={styles.searchContent}>
        <input
          className={styles.search}
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className={styles.filter}>
        <FilterTask filter={filter} onFilterChange={handleFilterChange} />
        <button
          className={styles.clearBtn}
          onClick={() => {
            deleteAllTodos();
          }}
        >
          X
        </button>
      </div>
      <div className={styles.listContainer}>
        <ul>
          {filteredTask.map((task) => (
            <Task
              key={task.id}
              task={task}
              onToggleDone={(id) =>
                updateTodo(id, {
                  ...todos.find((task) => task.id === id),
                  checked: !todos.find((task) => task.id === id).checked,
                })
              }
              onDelete={deleteTodo}
              onEdit={() => handleEditTask(task)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ToDoList;
