/* eslint-disable react/no-children-prop */
import React from "react";
import Head from "next/head";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import MarkdownRender from "../components/blog/markdown_render";
import Comment from "../components/blog/comment";
import styles from "./blog.module.css";

export default function Blog({
  frontMatter: { title, date, tag, excerpt },
  content,
  prefix,
}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{title} - WayneChoi.dev</title>
        <meta name="author" content="Wayne Choi" />
        <meta name="description" content={excerpt} />
        <meta
          name="keywords"
          content={tag.map((tagItem) => {
            return tagItem;
          })}
        />
      </Head>
      <div className={styles.tagWrapper}>
        {tag.map((tagItem, index) => (
          <span key={index} className={styles.tag}>
            #{tagItem}
          </span>
        ))}
      </div>
      <h1 className={styles.h1}>{title}</h1>
      <span className={styles.date}>{date}</span>

      <div className={styles.content}>
        <MarkdownRender content={content} prefix={prefix} />
      </div>
      <Comment issueTerm={title} />
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
    props: { frontMatter, content },
  };
}
