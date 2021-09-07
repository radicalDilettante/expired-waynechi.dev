import React, { useEffect, useRef } from "react";
import { useRouter } from "next/dist/client/router";

import styles from "./search.module.css";

import PostCard from "../components/blog/post_card";
import getBlogList from "../service/blog/get_list";

export default function Search({ posts, prefix }) {
  const router = useRouter();
  const query = router.query.q;
  const searchResult = posts.filter((post) => {
    if (Object.values(post).join().toLowerCase().indexOf(query) >= 0) {
      return post;
    }
  });
  console.log(PostCard);
  return (
    <div className={styles.container}>
      <div className={styles.postsWrapper}>
        {searchResult.map((post, index) => (
          <PostCard key={index} prefix={prefix} post={post} />
        ))}
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
