import React from "react";

import Link from "next/link";

export default function HeaderItem({ menu }) {
  return (
    <li>
      <Link href={menu.path}>{menu.name}</Link>
    </li>
  );
}
