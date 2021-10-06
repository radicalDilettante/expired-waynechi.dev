import React, { ReactChild } from "react";
import Header from "./header";

import styles from "./index.module.css";
import theme from "../../style/theme.module.css";

const date = new Date();

interface IProps {
  prefix: string;
  children: ReactChild;
  isDark: boolean;
  toggleTheme: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Layout({
  prefix,
  children,
  isDark,
  toggleTheme,
}: IProps) {
  return (
    <div className={styles.container}>
      <header
        className={`${styles.header} ${isDark ? theme.dark : theme.light}`}
      >
        <Header prefix={prefix} toggleTheme={toggleTheme} isDark={isDark} />
      </header>
      <section className={styles.contents}>{children}</section>
      <footer className={styles.footer}>
        (C) {date.getFullYear()}. Wonjun Choi. All rights reserved.
      </footer>
    </div>
  );
}
