import React from "react";
import styles from "../Home/Home.module.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Welcome to My ToDo</h1>
        <Link to="/todo" className={styles.startBtn}>
          Start
        </Link>
      </div>
    </div>
  );
}
