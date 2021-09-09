/* eslint-disable react/no-children-prop */
import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Markdown from "../components/blog/markdown";
import styles from "./[slug].module.css";

export default function Blog({
  frontMatter: { title, date, tag },
  content,
  prefix,
}) {
  return (
    <div className={styles.container}>
      {tag.map((tagItem, index) => (
        <span key={index} className={styles.tag}>
          #{tagItem}
        </span>
      ))}
      <h1 className={styles.h1}>{title}</h1>
      <span className={styles.date}>{date}</span>

      <div className={styles.content}>
        <Markdown content={content} prefix={prefix} />
      </div>
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
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join("posts", slug + ".md"),
    "utf-8"
  );

  const { data: frontMatter, content } = matter(markdownWithMeta);

  return {
    props: { frontMatter, content },
  };
}
