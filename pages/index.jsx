import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import { Main } from "../service/animation/main";
import Head from "next/head";

import PostList from "../components/blog/post_list";
import TagList from "..//components/blog/tag_list";
import getBlogList from "../service/blog/get_list";

export default function Home({ posts }) {
  //animation
  const canvas = useRef();
  useEffect(() => {
    new Main(canvas);
  }, []);

  //tag
  const [result, setResult] = useState(posts);
  const [selected, setSelected] = useState([]);

  const filterByTag = (target, tag) => {
    return target.filter((post) => {
      return post.tag.indexOf(tag) > -1;
    });
  };

  const numberByTag = (tag) => {
    return filterByTag(posts, tag).length;
  };

  useEffect(() => {
    if (selected.length === 0) {
      setResult(posts);
    } else {
      let newTagList = [...posts];
      selected.forEach((tag) => {
        newTagList = filterByTag(newTagList, tag);
      });
      setResult(newTagList);
    }
  }, [selected]);

  return (
    <div className={styles.container}>
      <Head>
        <title>WayneChoi.dev</title>
        <meta name="author" content="Wayne Choi" />
        <meta name="description" content="Tech blog of Wayne Choi." />
        <meta
          name="keywords"
          content="javascript, react, frontend, developer"
        />
      </Head>
      <div className={styles.canvasWrapper}>
        <canvas ref={canvas} className={styles.canvas} />
      </div>
      <p className={styles.bonVoyage}>Bon Voyage!</p>
      <div className={styles.mobileTag}>
        <TagList
          posts={posts}
          selected={selected}
          setSelected={setSelected}
          numberByTag={numberByTag}
        />
      </div>
      <div className={styles.blogContainer}>
        <div className={styles.postList}>
          {result.length > 0 ? (
            <PostList posts={result} />
          ) : (
            <p className={styles.noFound}>
              No result found
              <br />
              Please set tags again
            </p>
          )}
        </div>
        <div className={styles.tag}>
          <TagList
            posts={posts}
            selected={selected}
            setSelected={setSelected}
            numberByTag={numberByTag}
          />
        </div>
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
