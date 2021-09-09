import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import HeaderItem from "./header_item";
import SearchBar from "../search/search_bar";

import styles from "./header.module.css";

export default function Header({ prefix }) {
  const router = useRouter();
  const [isHideMobileMenu, SetIsHideMobileMenu] = useState(true);
  const [isHideMobileSearch, SetIsHideMobileSearch] = useState(true);

  const toggleMobileMenu = () => {
    if (isHideMobileMenu) {
      SetIsHideMobileSearch(true);
      SetIsHideMobileMenu(false);
    } else {
      SetIsHideMobileMenu(true);
    }
  };

  const toggleMobileSearch = () => {
    if (isHideMobileSearch) {
      SetIsHideMobileMenu(true);
      SetIsHideMobileSearch(false);
    } else {
      SetIsHideMobileSearch(true);
    }
  };

  useEffect(() => {
    SetIsHideMobileMenu(true);
    SetIsHideMobileSearch(true);
  }, [router]);

  const menus = [
    { name: "HOME", path: "/" },
    { name: "ABOUT", path: "/about" },
    { name: "PORTFOLIO", path: "/work" },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.mobileMenuButton} onClick={toggleMobileMenu}>
          {isHideMobileMenu ? (
            <img alt="menu" src={prefix + "images/menu.svg"} />
          ) : (
            <img alt="menu" src={prefix + "images/close.svg"} />
          )}
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
        <button
          className={styles.mobileSearchButton}
          onClick={toggleMobileSearch}
        >
          {isHideMobileSearch ? (
            <img alt="search" src={prefix + "images/search.svg"} />
          ) : (
            <img alt="search" src={prefix + "images/close.svg"} />
          )}
        </button>
      </div>
      {!isHideMobileSearch && (
        <div className={styles.mobileSearchBar}>
          <SearchBar prefix={prefix} />
        </div>
      )}
      {!isHideMobileMenu && (
        <ul className={styles.mobileMenuBar}>
          {menus.map((menu, index) => (
            <HeaderItem key={index} menu={menu} />
          ))}
        </ul>
      )}
    </div>
  );
}
