import React, { useEffect, useRef } from "react";
import styles from "./index.module.css";
import { Main } from "../service/animation/main";

export default function Home() {
  const canvas = useRef();
  useEffect(() => {
    new Main(canvas);
  });

  return (
    <div className={styles.container}>
      <canvas ref={canvas} className={styles.canvas} />
    </div>
  );
}
