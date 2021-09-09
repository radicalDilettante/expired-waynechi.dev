import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "./search_bar.module.css";

export default function SearchBar({ prefix }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    router.push({
      pathname: "/search",
      query: { q: query },
    });
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <input
        id="keyword"
        type="text"
        placeholder="keywords..."
        onChange={(e) => setQuery(e.target.value)}
        required
      />
      <button type="submit">
        <img alt="search" src={prefix + "images/search.svg"} />
      </button>
    </form>
  );
}
