import React from "react";
import Header from "./header";

import styles from "./index.module.css";

export default function Layout(props) {
  return (
    <div className={styles.container}>
      <Header></Header>
      <section className={styles.contentsWrapper}>{props.children}</section>
      <footer className={styles.footer}>
        (C) {props.year}. Wonjun Choi. All rights reserved.
      </footer>
    </div>
  );
}
