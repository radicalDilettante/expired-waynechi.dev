import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import HeaderItem from "./header_item";
import SearchBar from "../search/search_bar";

import styles from "./header.module.css";

export default function Header({ prefix }) {
  const router = useRouter();

  const menus = [
    { name: "HOME", path: "/" },
    { name: "ABOUT", path: "/about" },
    { name: "PORTFOLIO", path: "/work" },
  ];
  return (
    <div className={styles.container}>
      <button className={styles.mobileMenu}>
        <img alt="menu" src={prefix + "images/menu.svg"} />
      </button>
      <Link href="/">
        <a className={styles.name}>WayneChoi.dev</a>
      </Link>
      <ul className={styles.list}>
        {menus.map((menu, index) => (
          <HeaderItem key={index} menu={menu} />
        ))}
      </ul>
      <div className={styles.searchBar}>
        <SearchBar prefix={prefix} />
      </div>
      <button className={styles.mobileSearch}>
        <img alt="search" src={prefix + "images/search.svg"} />
      </button>
    </div>
  );
}
