import React, { useEffect, useRef } from "react";
import styles from "./index.module.css";
import { Main } from "../service/animation/main";
import sortByDate from "../service/sort_by_date";

import PostCard from "../components/blog/post_card";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

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
  const files = fs.readdirSync(path.join("posts"));

  const posts = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );

    const { data: frontMatter } = matter(markdownWithMeta);

    return {
      frontMatter,
    };
  });
  let result = posts.sort(sortByDate);
  if (result.length >= 5) {
    result = result.slice(0, 4);
  }
  return {
    props: {
      files,
      posts: result,
    },
  };
}
