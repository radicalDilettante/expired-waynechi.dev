import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  BoxGeometry,
  Mesh,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  DirectionalLight,
  MeshPhongMaterial,
  Color,
} from "three";

import styles from "./animation.module.css";

export default function Animation() {
  const canvas = useRef(null);

  useEffect(() => {
    const renderer = new WebGLRenderer();
    canvas.current.appendChild(renderer.domElement);
    const width = canvas.current.offsetWidth;
    const height = (width * 2) / 3;
    renderer.setSize(width, height);

    const fov = 75; //filed of view
    const aspect = 2; //default ratio
    const near = 0.1;
    const far = 5;
    const camera = new PerspectiveCamera(fov, aspect, near, far);

    camera.position.z = 2;

    const scene = new Scene();
    scene.background = new Color(0xffffff);

    //add light
    const color = 0xffffff;
    const intensity = 1;
    const light = new DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);

    //geometry
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new BoxGeometry(boxWidth, boxHeight, boxDepth);

    //const material = new MeshBasicMaterial({ color: 0x44aa88 });
    //make a material for shiny surfaces with specular highlights.
    const material = new MeshPhongMaterial({ color: 0x44aa88 });

    const cube = new Mesh(geometry, material);

    scene.add(cube);
    function render(time) {
      time *= 0.001; // convert time to seconds

      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();

      cube.rotation.x = time;
      cube.rotation.y = time;

      renderer.render(scene, camera);

      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
  }, []);
  return <div ref={canvas} className={styles.container}></div>;
}
