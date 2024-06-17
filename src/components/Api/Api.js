import React, { useEffect, useState } from "react";
import ToDoList from "../ToDoList/ToDoList";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const _API = axios.create({
  baseURL: "https://66670e5da2f8516ff7a61ddb.mockapi.io/todos",
});

const Api = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await _API.get("/todos");
        setTodos(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch todos");
        navigate("/error-page", {
          state: { message: `${err.message}` },
        });
        setLoading(false);
      }
    };

    fetchTodos();
  }, [navigate]);

  const addTodo = async (newTodo) => {
    try {
      const response = await _API.post("/todos", newTodo);

      setTodos([...todos, response.data]);
    } catch (err) {
      setError("Failed to add todo");
      navigate("/error-page", {
        state: { message: `${err.message}` },
      });
    }
  };

  const updateTodo = async (id, updatedTodo) => {
    try {
      const response = await _API.put(`/todos/${id}`, updatedTodo);

      setTodos(todos.map((todo) => (todo.id === id ? response.data : todo)));
    } catch (err) {
      setError("Failed to update todo");
      navigate("/error-page", {
        state: { message: `${err.message}` },
      });
    }
  };

  const deleteTodo = async (id) => {
    try {
      await _API.delete(`/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      setError("Failed to delete todo");
      navigate("/error-page", {
        state: { message: `${err.message}` },
      });
    }
  };

  const deleteAllTodos = async () => {
    try {
      const deletePromises = todos.map((todo) =>
        _API.delete(`/todos/${todo.id}`)
      );
      await Promise.all(deletePromises);
      setTodos([]);
    } catch (err) {
      setError("Failed to delete all todos");
      navigate("/error-page", {
        state: { message: `${err.message}` },
      });
    }
  };

  return (
    <div className="App">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <ToDoList
          todos={todos}
          addTodo={addTodo}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
          deleteAllTodos={deleteAllTodos}
        />
      )}
    </div>
  );
};

export default Api;
