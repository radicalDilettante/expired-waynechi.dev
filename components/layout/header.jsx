import React from "react";
import HeaderItem from "./header_item";

import styles from "./header.module.css";

export default function Header() {
  const menus = [
    { name: "HOME", path: "/" },
    { name: "ABOUT", path: "/about" },
    { name: "BLOG", path: "/blog" },
    //{ name: "WORK", path: "/work" },
  ];
  return (
    <header className={styles.container}>
      <h1 className={styles.name}>Wayne Choi</h1>
      <p className={styles.desc}>Web developer & Boat builder</p>
      <ul className={styles.list}>
        {menus.map((menu, index) => (
          <HeaderItem key={index} menu={menu} />
        ))}
      </ul>
    </header>
  );
}
