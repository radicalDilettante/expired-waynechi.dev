/* eslint-disable react/no-children-prop */
import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import styles from "./post.module.css";
import ReactMarkdown from "react-markdown";

export default function Blog({
  frontMatter: { title, date, cover_image },
  content,
  prefix,
}) {
  return (
    <div className={styles.container}>
      {cover_image && (
        <img src={prefix + cover_image} className={styles.img} alt={title} />
      )}
      <ReactMarkdown
        children={content}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, "")}
                language={match[1]}
                PreTag="div"
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      />
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
