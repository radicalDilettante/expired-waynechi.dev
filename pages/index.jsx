import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import { Main } from "../service/animation/main";

import PostList from "../components/blog/post_list";
import TagList from "..//components/blog/tag_list";
import getBlogList from "../service/blog/get_list";

export default function Home({ posts }) {
  //animation
  const canvas = useRef();
  useEffect(() => {
    new Main(canvas);
  }, []);

  //tag
  const [result, setResult] = useState(posts);
  const [selected, setSelected] = useState("All");

  const filter = (tag) => {
    setSelected(tag);
    if (tag === "All") {
      setResult(posts);
    } else {
      setResult(posts.filter((post) => post.tag === tag));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.canvasWrapper}>
        <canvas ref={canvas} className={styles.canvas} />
      </div>
      <div className={styles.blogContainer}>
        <div className={styles.postList}>
          <PostList posts={result} />
        </div>
        <div className={styles.tag}>
          <TagList posts={posts} selected={selected} filter={filter} />
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const posts = getBlogList();

  return {
    props: {
      posts,
    },
  };
}
