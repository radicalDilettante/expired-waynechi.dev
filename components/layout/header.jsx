import React from "react";
import HeaderItem from "./header_item";

export default function Header() {
  const menus = [
    { name: "HOME", path: "/" },
    { name: "ABOUT", path: "/about" },
    { name: "BLOG", path: "/blog" },
    { name: "PORTFOLIO", path: "/portfolio" },
    { name: "RESUME", path: "/resume" },
  ];
  return (
    <header>
      <h1>Wayne Choi</h1>
      <h2>Web developer & Boat builder</h2>
      <ul>
        {menus.map((menu, index) => (
          <HeaderItem key={index} menu={menu} />
        ))}
      </ul>
    </header>
  );
}
