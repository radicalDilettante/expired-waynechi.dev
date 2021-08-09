import React, { useEffect, useRef } from "react";
import styles from "./index.module.css";
import { Main } from "../service/animation/main";

import Layout from "../components/layout";

export default function About({ prefix }) {
  const canvas = useRef();
  useEffect(() => {
    new Main(canvas);
  });

  return (
    <Layout>
      <div className={styles.container}>
        <canvas ref={canvas} className={styles.canvas} />
      </div>
    </Layout>
  );
}
