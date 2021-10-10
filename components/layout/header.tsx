import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import HeaderItem from "./header_item";
import SearchBar from "../search/search_bar";

import styles from "./header.module.css";
import theme from "../../style/theme.module.css";

interface IProps {
  prefix: string;
  isDark: boolean;
}

export default function Header({ prefix, isDark }: IProps) {
  const router = useRouter();
  const [isHideMobileMenu, setIsHideMobileMenu] = useState(true);
  const [isHideMobileSearch, setIsHideMobileSearch] = useState(true);

  const cliBoot = () => {
    if (confirm("Do you want to boot to command prompt?") == true) {
      router.push("/cli");
    } else {
    }
  };

  const toggleMobileMenu = () => {
    if (isHideMobileMenu) {
      setIsHideMobileSearch(true);
      setIsHideMobileMenu(false);
    } else {
      setIsHideMobileMenu(true);
    }
  };

  const toggleMobileSearch = () => {
    if (isHideMobileSearch) {
      setIsHideMobileMenu(true);
      setIsHideMobileSearch(false);
    } else {
      setIsHideMobileSearch(true);
    }
  };
  useEffect(() => {
    setIsHideMobileMenu(true);
    setIsHideMobileSearch(true);
  }, [router]);

  const menus = [
    { name: "HOME", path: "/" },
    { name: "ABOUT", path: "/about" },
    { name: "PORTFOLIO", path: "/portfolio" },
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
          <li>
            <button className={styles.cliButton} onClick={cliBoot}>
              <img src={prefix + "images/cli.png"} />
            </button>
          </li>
        </ul>
        <div className={styles.searchBar}>
          <SearchBar prefix={prefix} isDark={isDark} />
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
        <div
          className={`${styles.mobileSearchBar} ${
            isDark ? theme.dark : theme.light
          }`}
        >
          <SearchBar prefix={prefix} isDark={isDark} />
        </div>
      )}
      {!isHideMobileMenu && (
        <ul
          className={`${styles.mobileMenuBar} ${
            isDark ? theme.dark : theme.light
          }`}
        >
          {menus.map((menu, index) => (
            <HeaderItem key={index} menu={menu} />
          ))}
          <li>
            <button className={styles.cliButton} onClick={cliBoot}>
              <img src={prefix + "images/cli.png"} />
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
