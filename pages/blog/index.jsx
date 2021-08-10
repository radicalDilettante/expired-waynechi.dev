import React from "react";

import fs from "fs";
import path from "path";
import matter from "gray-matter";

import styles from "./index.module.css";

import PostCard from "../../components/blog/post_card";
import sortByDate from "../../service/sort_by_date";

export default function index({ posts, prefix }) {
  return (
    <div className={styles.container}>
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
