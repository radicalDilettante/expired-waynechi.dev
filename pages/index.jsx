import React, { useEffect, useRef } from "react";
import styles from "./index.module.css";
import { Main } from "../service/animation/main";

import PostCard from "../components/blog/post_card";
import blogList from "../service/blog/blog_list";

export default function Home({ prefix, posts }) {
  const canvas = useRef();
  useEffect(() => {
    new Main(canvas);
  });

  return (
    <div className={styles.container}>
      <div className={styles.canvasWrapper}>
        <canvas ref={canvas} className={styles.canvas} />
      </div>

      <p className={styles.txt}>Bon Voyage!</p>

      <div className={styles.postsWrapper}>
        {posts.map((post, index) => (
          <PostCard key={index} post={post} prefix={prefix} />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const posts = blogList();
  let result = posts;
  if (result.length >= 5) {
    result = result.slice(0, 4);
  }
  return {
    props: {
      posts: result,
    },
  };
}
