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
          <a href={menu.path}>{menu.name}</a>
        </Link>
      </div>
    </li>
  );
}
