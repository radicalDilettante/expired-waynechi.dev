import React, { useEffect, useRef } from "react";
import styles from "./index.module.css";
import { Main } from "../service/animation/main";
import PostCard from "../components/blog/post_card";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const sortByDate = (a, b) => {
  return new Date(b.frontMatter.date) - new Date(a.frontMatter.date);
};

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
    const slug = filename.replace(".md", "");

    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );

    const { data: frontMatter, content } = matter(markdownWithMeta);

    return {
      slug,
      content,
      frontMatter,
    };
  });

  return {
    props: {
      posts: posts.sort(sortByDate),
    },
  };
}
