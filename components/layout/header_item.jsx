import React from "react";
import Link from "next/link";

import styles from "./header_item.module.css";
import { useRouter } from "next/router";

export default function HeaderItem({ menu }) {
  const router = useRouter();

  return (
    <li
      className={
        router.pathname === menu.path
          ? styles.list_item_active
          : styles.list_item
      }
    >
      <Link href={menu.path} className={styles.link}>
        {menu.name}
      </Link>
    </li>
  );
}
