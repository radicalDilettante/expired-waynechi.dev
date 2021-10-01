import React, { ReactChild } from "react";
import Header from "./header";

import styles from "./index.module.css";

interface IProps {
  prefix: string;
  year: number;
  children: ReactChild;
}

export default function Layout(props: IProps) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Header prefix={props.prefix} />
      </header>
      <section className={styles.contents}>{props.children}</section>
      <footer className={styles.footer}>
        (C) {props.year}. Wonjun Choi. All rights reserved.
      </footer>
    </div>
  );
}
