import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../ErrorPage/ErrorPage.module.css";

export default function ErrorPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { message } = location.state || { message: "Unknown Error" };

  return (
    <div className={styles.container}>
      <h1>There are some problems</h1>
      <p>{message}</p>
      <button onClick={() => navigate("/")} className={styles.errorBtn}>
        Back to Home page
      </button>
    </div>
  );
}
