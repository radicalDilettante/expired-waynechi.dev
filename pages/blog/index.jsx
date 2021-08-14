import React, { useState } from "react";

import styles from "./index.module.css";

import PostCard from "../../components/blog/post_card";
import blogList from "../../service/blog/blog_list";
import TagList from "../../components/blog/tag_list";

export default function Index({ posts, prefix }) {
  const [result, setResult] = useState(posts);
  const [isHideTags, setIsHideTags] = useState(true);
  const [selected, setSelected] = useState("All");

  const filter = (tag) => {
    setSelected(tag);
    if (tag === "All") {
      setResult(posts);
    } else {
      setResult(posts.filter((post) => post.tag === tag));
    }
  };

  const toggleIsHideTags = () => {
    if (isHideTags) {
      setIsHideTags(false);
    } else {
      setIsHideTags(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.menuIcon}>
        <img
          src={prefix + "images/menu.svg"}
          onClick={toggleIsHideTags}
          alt={"menu"}
        />
      </div>
      {!isHideTags && (
        <TagList posts={posts} selected={selected} filter={filter} />
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
