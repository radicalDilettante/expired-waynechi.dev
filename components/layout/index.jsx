import React from "react";
import Header from "./header";

import styles from "./index.module.css";

export default function Layout(props) {
  return (
    <div className={styles.container}>
      <Header></Header>
      <section>{props.children}</section>
    </div>
  );
}
