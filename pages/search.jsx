import React from "react";
import { useRouter } from "next/dist/client/router";

import styles from "./search.module.css";

import PostList from "../components/blog/post_list";
import getBlogList from "../service/blog/get_list";

export default function Search({ posts }) {
  const router = useRouter();
  let query = router.query.q;
  if (typeof query === "string") {
    query = query.toLowerCase();
  }
  const searchResult = posts.filter((post) => {
    if (Object.values(post).join().toLowerCase().indexOf(query) >= 0) {
      return post;
    }
  });
  return (
    <div className={styles.container}>
      <div className={styles.postsWrapper}>
        {searchResult.length > 0 ? (
          <p className={styles.header}>
            &quot;{query}&quot; search results ({searchResult.length})
          </p>
        ) : (
          <p className={styles.header}>No Search Result</p>
        )}
        <PostList posts={searchResult} />
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const posts = getBlogList();

  return {
    props: {
      posts,
    },
  };
}
