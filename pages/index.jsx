import React, { useEffect, useRef } from "react";
import styles from "./index.module.css";
import { Main } from "../service/animation/main";

import PostCard from "../components/blog/post_card";
import getBlogList from "../service/blog/get_list";

export default function Home({ prefix, posts }) {
  const canvas = useRef();
  useEffect(() => {
    new Main(canvas);
  }, []);
  let query = "js";
  const searchResult = posts.filter((post) => {
    if (Object.values(post).join().toLowerCase().indexOf(query) >= 0) {
      return post;
    }
  });
  console.log(searchResult);
  return (
    <div className={styles.container}>
      <div className={styles.canvasWrapper}>
        <canvas ref={canvas} className={styles.canvas} />
      </div>
      <div className={styles.blogContainer}>
        <p className={styles.txt}>Bon Voyage!</p>

        <div className={styles.postsWrapper}>
          {posts.map((post, index) => (
            <PostCard key={index} post={post} prefix={prefix} />
          ))}
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
