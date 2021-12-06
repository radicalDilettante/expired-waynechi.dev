/* eslint-disable react/no-children-prop */
import React from "react";
import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from "next";
import Head from "next/head";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import MarkdownRender from "../components/blog/markdown_render";
import Comment from "../components/blog/comment";
import styles from "../style/blog.module.css";
import Post from "../interface/post";

export default function Blog({ title, date, tag, excerpt, content }: Post) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{title} - WayneChoi.dev</title>
        <meta name="author" content="Wayne Choi" />
        <meta name="description" content={excerpt} />
        <meta name="keywords" content={tag.join()} />
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
        <MarkdownRender content={content} />
      </div>
      <Comment />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
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
};
export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const slug = context.params?.slug;
  const markdownWithMeta = fs.readFileSync(
    path.join("posts", slug + ".md"),
    "utf-8"
  );

  const { data: frontMatter, content } = matter(markdownWithMeta);
  const { title, date, tag, excerpt } = frontMatter;
  return {
    props: { title, date, tag, excerpt, content },
  };
};
