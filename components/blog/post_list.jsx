import React from "react";
import PostCard from "./post_card";
import styles from "./post_list.module.css";

export default function PostList({ posts }) {
  return (
    <div className={styles.container}>
      {posts.map((post, index) => (
        <PostCard key={index} post={post} />
      ))}
    </div>
  );
}
