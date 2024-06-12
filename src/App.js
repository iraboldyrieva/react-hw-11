import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import ToDo from "./pages/ToDo/ToDo";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/todo" element={<ToDo />} />
    </Routes>
  );
}
