import React from "react";

import styles from "./tag_list.module.css";
import TagListItem from "./tag_list_item";

export default function TagList({ posts, selected, setSelected, numberByTag }) {
  let tagList = [];
  posts.forEach((post) => {
    tagList = [...tagList, ...post.tag];
  });
  tagList = [...new Set(tagList)].sort();

  return (
    <ul className={styles.container}>
      <p className={styles.subject}>Tag</p>
      {tagList.map((tag, index) => (
        <TagListItem
          key={index}
          tag={tag}
          selected={selected}
          setSelected={setSelected}
          numberByTag={numberByTag}
        />
      ))}
    </ul>
  );
}
