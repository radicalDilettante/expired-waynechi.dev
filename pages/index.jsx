import React, { useEffect } from "react";
import styles from "./index.module.css";
import { Main } from "../service/animation/main";

export default function Home() {
  useEffect(() => {
    new Main();
  });
  return (
    <div className={styles.container}>
      <div id={"box"} className={styles.box} />
    </div>
  );
}
