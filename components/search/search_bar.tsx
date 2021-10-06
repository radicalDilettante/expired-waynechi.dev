import React, { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import styles from "./search_bar.module.css";
import theme from "../../style/theme.module.css";

interface IProps {
  prefix: string;
  isDark: boolean;
}

export default function SearchBar({ prefix, isDark }: IProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    router.push({
      pathname: "/search",
      query: { q: query },
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`${styles.container} ${isDark ? theme.dark : theme.light}`}
    >
      <input
        id="keyword"
        type="text"
        placeholder="keywords..."
        onChange={(event) => setQuery(event.target.value)}
        required
        className={isDark ? theme.dark : theme.light}
      />
      <button type="submit">
        <img alt="search" src={prefix + "images/search.svg"} />
      </button>
    </form>
  );
}
