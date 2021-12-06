import React, { ReactChild } from "react";
import Header from "../header";

import styles from "./style.module.css";
import theme from "../../../style/theme.module.css";

const date = new Date();

interface IProps {
  prefix: string;
  children: ReactChild;
  isDark: boolean;
}

export default function Layout({ prefix, children, isDark }: IProps) {
  return (
    <div className={styles.container}>
      <header
        className={`${styles.header} ${isDark ? theme.dark : theme.light}`}
      >
        <Header prefix={prefix} isDark={isDark} />
      </header>
      <section className={styles.contents}>{children}</section>
      <footer className={styles.footer}>
        (C) {date.getFullYear()}. Wonjun Choi. All rights reserved.
      </footer>
    </div>
  );
}
