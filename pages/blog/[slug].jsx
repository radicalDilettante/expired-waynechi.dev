/* eslint-disable react/no-children-prop */
import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

import Markdown from "../../components/blog/markdown";
import styles from "./post.module.css";

export default function Blog({
  frontMatter: { title, date, cover_image, tag },
  content,
  prefix,
}) {
  return (
    <div className={styles.container}>
      <p className={styles.tag}># {tag}</p>
      {cover_image && (
        <img src={prefix + cover_image} className={styles.img} alt={title} />
      )}
      <h1 className={styles.subject}>{title}</h1>
      <p className={styles.date}>{date}</p>
      <Markdown content={content} prefix={prefix} />
    </div>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts"));

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join("posts", slug + ".md"),
    "utf-8"
  );

  const { data: frontMatter, content } = matter(markdownWithMeta);

  return {
    props: {
      frontMatter,
      content,
    },
  };
}
