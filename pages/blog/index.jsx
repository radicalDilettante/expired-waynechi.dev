import React, { useState } from "react";

import styles from "./index.module.css";

import PostCard from "../../components/blog/post_card";
import blogList from "../../service/blog/blog_list";

export default function index({ posts, prefix }) {
  const [result, setResult] = useState(posts);
  const [isHideTags, setIsHideTags] = useState(true);
  const [selected, setSelected] = useState("All");
  const tagList = [
    "All",
    ...Array.from(new Set(posts.map((post) => post.tag))),
  ];

  const filter = (tag) => {
    setSelected(tag);
    if (tag === "All") {
      setResult(posts);
    } else {
      setResult(posts.filter((post) => post.tag === tag));
    }
    console.log(selected);
  };

  const toggleIsHideTags = () => {
    if (isHideTags) {
      setIsHideTags(false);
    } else {
      setIsHideTags(true);
    }
  };

  const numberByTag = (tag) => {
    if (tag === "All") {
      return posts.length;
    } else {
      return posts.filter((post) => post.tag === tag).length;
    }
  };

  console.log();
  //const result = posts.filter((post) => post.tag === "react");

  return (
    <div className={styles.container}>
      <div className={styles.status}>
        <img
          className={styles.menuIcon}
          src={prefix + "images/menu.svg"}
          onClick={toggleIsHideTags}
        />
      </div>
      {!isHideTags && (
        <ul className={styles.tagsWrapper}>
          {tagList.map((tag, index) => (
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
      )}
      <div className={styles.postsWrapper}>
        {result.map((post, index) => (
          <PostCard key={index} post={post} prefix={prefix} />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      posts: blogList(),
    },
  };
}
