import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../ErrorPage/ErrorPage.module.css";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <h1>Page is not found</h1>
      <button onClick={() => navigate("/")} className={styles.errorBtn}>
        Back to Home page
      </button>
    </div>
  );
}
