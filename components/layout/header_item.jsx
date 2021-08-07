import React from "react";
import Link from "next/link";

import styles from "./header_item.module.css";

export default function HeaderItem({ menu }) {
  return (
    <li className={styles.list_item}>
      <Link href={menu.path}>{menu.name}</Link>
    </li>
  );
}
