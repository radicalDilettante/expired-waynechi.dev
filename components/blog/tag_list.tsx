import React, { useEffect, useState } from "react";
import Post from "../../interface/post";

import styles from "./tag_list.module.css";
import TagListItem from "./tag_list_item";

interface IProps {
  posts: Post[];
  selected: string[];
  setSelected: string[];
  numberByTag: number;
}

export default function TagList({
  posts,
  selected,
  setSelected,
  numberByTag,
}: IProps) {
  const [isFixed, setIsFixed] = useState(false);

  let tagList: string[] = [];
  posts.forEach((post) => {
    tagList = [...tagList, ...post.tag];
  });
  tagList = Array.from(new Set(tagList)).sort();

  function handleScroll() {
    if (scrollY > 450) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  return (
    <ul className={isFixed ? styles.fixedContainer : styles.container}>
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
