import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

import styles from "./blog.module.css";

export default function Blog({
  frontMatter: { title, date, cover_image },
  content,
}) {
  let markedContent;
  markedContent = content.split("\r\n");
  markedContent = markedContent.filter((element, i) => element !== "");
  return (
    <div>
      <h1>{title}</h1>
      <p>{date}</p>
      {cover_image && <img src={cover_image} className={styles.img} />}
      {markedContent.map((text, index) => (
        <p key={index}>{text}</p>
      ))}
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
