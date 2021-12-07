import React, { useEffect, useRef, useState } from "react";
import styles from "../style/index.module.css";
import { Main } from "../service/animation/main";
import Head from "next/head";
import { GetStaticProps } from "next";

import PostList from "../components/blog/post_list";
import TagList from "../components/blog/tag_list";
import getBlogList from "../service/blog/get_list";
import Post from "../interface/post";

interface IProps {
  posts: Post[];
  isDark: boolean;
  toggleTheme: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Home({ posts, isDark, toggleTheme }: IProps) {
  //animation
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    new Main(canvas.current!);
  }, []);

  //tag
  const [result, setResult] = useState<Post[]>(posts);
  const [selected, setSelected] = useState<string[]>([]);

  const filterByTag = (target: Post[], tag: string) => {
    return target.filter((post) => {
      return post.tag.indexOf(tag) > -1;
    });
  };

  const numberByTag = (tag: string) => {
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
      <div className={styles.canvas_wrapper}>
        <div className={styles.theme_button_wrapper}>
          <button className={styles.theme_button} onClick={toggleTheme}>
            <div
              className={`${styles.slider} ${
                isDark ? styles.dark_theme_button : styles.light_theme_button
              }`}
            />
          </button>
        </div>
        <canvas
          ref={canvas}
          className={`${styles.canvas} ${isDark ? styles.night : styles.day}`}
        />
      </div>
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

export const getStaticProps: GetStaticProps = async () => {
  const posts = getBlogList();
  return {
    props: {
      posts,
    },
  };
};
