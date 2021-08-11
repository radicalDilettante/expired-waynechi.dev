import React from "react";

import styles from "./index.module.css";

import PostCard from "../../components/blog/post_card";
import blogList from "../../service/blog/blog_list";

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
  return {
    props: {
      posts: blogList(),
    },
  };
}
