import React, { useEffect, useRef, useState, useCallback } from "react";

import styles from "./animation.module.css";

export default function Animation() {
  const container = useRef(null);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    container.current.appendChild(canvas);

    const stageWidth = container.current.offsetWidth;
    const stageHeight = (stageWidth * 2) / 3;

    const canvasWidth = stageWidth * 2;
    const canvasHeight = stageHeight * 2;
    ctx.scale(2, 2);

    const render = () => {
      requestAnimationFrame(render);

      ctx.clearRect(0, 0, stageWidth, stageHeight);
    };
    requestAnimationFrame(render);
  }, []);
  return <div ref={container} className={styles.container}></div>;
}
