import React from "react";
import HeaderItem from "./header_item";

import styles from "./header.module.css";

export default function Header() {
  const menus = [
    { name: "HOME", path: "/" },
    { name: "ABOUT", path: "/about" },
    { name: "BLOG", path: "/blog" },
    { name: "PORTFOLIO", path: "/work" },
  ];
  return (
    <div className={styles.container}>
      <p className={styles.name}>WayneChoi.dev</p>
      <ul className={styles.list}>
        {menus.map((menu, index) => (
          <HeaderItem key={index} menu={menu} />
        ))}
      </ul>
    </div>
  );
}
