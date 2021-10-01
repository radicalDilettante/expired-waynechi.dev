import React from "react";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";

import styles from "./search.module.css";

import PostList from "../components/blog/post_list";
import getBlogList from "../service/blog/get_list";
import Post from "../interface/post";

interface IProps {
  posts: Post[];
}

export default function Search({ posts }: IProps) {
  const router = useRouter();
  let query: string = "";
  if (typeof router.query.q === "string") {
    query = router.query.q.toLowerCase();
  }

  const searchResult = posts.filter((post) => {
    if (Object.values(post).join().toLowerCase().indexOf(query) >= 0) {
      return post;
    }
  });
  return (
    <div className={styles.container}>
      <Head>
        <title>Search - WayneChoi.dev</title>
        <meta name="author" content="Wayne Choi" />
        <meta name="description" content="Tech blog of Wayne Choi." />
        <meta
          name="keywords"
          content="javascript, react, frontend, developer"
        />
      </Head>
      <div className={styles.postsWrapper}>
        {searchResult.length > 0 ? (
          <p className={styles.header}>
            &quot;{query}&quot; search results ({searchResult.length})
          </p>
        ) : (
          <p className={styles.header}>No search result</p>
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
