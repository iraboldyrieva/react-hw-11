import React, { Suspense, lazy, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { _API } from "./components/Api/Api";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

const Home = lazy(() => import("./pages/Home/Home"));
const About = lazy(() => import("./pages/About/About"));
const Api = lazy(() => import("./components/Api/Api"));
const ErrorPage = lazy(() => import("./pages/ErrorPage/ErrorPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));
const Login = lazy(() => import("./pages/Login/Login"));

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const login = async (username, password) => {
    try {
      const response = await _API.post("/auth", { username, password });

      if (response.status === 200 || response.status === 201) {
        setIsAuthenticated(true);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("An error occurred during login", error);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/login" element={<Login login={login} />} />
        <Route
          path="/"
          element={
            <PrivateRoute
              element={<Home />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route
          path="/todo"
          element={
            <PrivateRoute element={<Api />} isAuthenticated={isAuthenticated} />
          }
        />
        <Route path="/error-page" element={<ErrorPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
