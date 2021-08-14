import React from "react";

import styles from "./tag_list.module.css";

export default function TagList({ posts, selected, filter }) {
  const tags = ["All", ...Array.from(new Set(posts.map((post) => post.tag)))];
  const numberByTag = (tag) => {
    if (tag === "All") {
      return posts.length;
    } else {
      return posts.filter((post) => post.tag === tag).length;
    }
  };

  return (
    <ul className={styles.tagsWrapper}>
      {tags.map((tag, index) => (
        <li
          className={tag === selected ? styles.selectedTag : ""}
          key={index}
          onClick={() => {
            filter(tag);
          }}
        >
          {tag} ({numberByTag(tag)})
        </li>
      ))}
    </ul>
  );
}
