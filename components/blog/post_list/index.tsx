import React from "react";
import Post from "../../../interface/post";
import PostCard from "../post_card";
import styles from "./style.module.css";

interface IProps {
  posts: Post[];
}

export default function PostList({ posts }: IProps) {
  return (
    <div className={styles.container}>
      {posts.map((post, index) => (
        <PostCard key={index} post={post} />
      ))}
    </div>
  );
}
