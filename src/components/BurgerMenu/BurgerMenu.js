import React from "react";
import { Link } from "react-router-dom";

export default function BurgerMenu() {
  return (
    <div
      className="container"
      style={{ gap: 10, flexDirection: "row", marginBottom: "20px" }}
    >
      <Link
        to="/"
        style={{
          fontFamily: "Gill Sans",
          color: "darkslategrey",
          textDecoration: "none",
        }}
      >
        Home
      </Link>
      <Link
        to="/todo"
        style={{
          fontFamily: "Gill Sans",
          color: "darkslategrey",
          textDecoration: "none",
        }}
      >
        My Todos
      </Link>
      <Link
        to="/about"
        style={{
          fontFamily: "Gill Sans",
          color: "darkslategrey",
          textDecoration: "none",
        }}
      >
        About
      </Link>
    </div>
  );
}
