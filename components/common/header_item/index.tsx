import React from "react";
import Link from "next/link";

import styles from "./style.module.css";
import { useRouter } from "next/router";

interface IProps {
  menu: { name: string; path: string };
}

export default function HeaderItem({ menu }: IProps) {
  const router = useRouter();
  return (
    <li
      className={
        router.pathname === menu.path
          ? styles.list_item_active
          : styles.list_item
      }
    >
      <div className={styles.link}>
        <Link href={menu.path}>{menu.name}</Link>
      </div>
    </li>
  );
}
