import React from "react";
import styles from "./About.module.css";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>About Us</h1>
        <p
          style={{
            fontFamily: "Gill Sans",
            color: "darkslategrey",
            textAlign: "center",
            marginBottom: 40,
          }}
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure
          voluptate illo exercitationem ratione quibusdam. Expedita dicta dolor
          modi aperiam consequuntur aliquid tenetur enim harum beatae illum? In
          fuga velit quisquam.
        </p>
        <Link to="/" className={styles.startBtn}>
          Back to Home page
        </Link>
      </div>
    </div>
  );
}
