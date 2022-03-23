import React from "react";
import Link from "next/link";

interface IProps {
  menu: { name: string; path: string };
}

export default function HeaderItem({ menu }: IProps) {
  return (
    <li>
      <div>
        <Link href={menu.path}>
          {menu.name === "CV" ? (
            <a href={menu.path} target="_blank">
              {menu.name}
            </a>
          ) : (
            <a href={menu.path}>{menu.name}</a>
          )}
        </Link>
      </div>
    </li>
  );
}
