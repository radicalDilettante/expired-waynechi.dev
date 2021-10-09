import { GetStaticProps } from "next";
import React, { useRef, useEffect, useState } from "react";
import Post from "../interface/post";
import {
  help,
  cd,
  clear,
  ls,
  render,
  renderErrorMsg,
} from "../service/blog/command";
import getBlogList from "../service/blog/get_list";
import styles from "./cli.module.css";

interface IProps {
  posts: Post[];
}

export default function Cli({ posts }: IProps) {
  const [inputValue, setInputValue] = useState("");
  const [curDir, setCurDir] = useState("");

  const input = useRef<HTMLInputElement>(null);
  const contents = useRef<HTMLDivElement>(null);

  const executeCmd = (command: string) => {
    render(contents, `guest: ~${curDir}$ ${inputValue}`, 10);

    if (command === "clear") {
      clear(contents);
    } else if (command === "help") {
      help(contents);
    } else if (command === "ls") {
      ls(contents, curDir, inputValue, posts);
    } else if (command[0] === "c" && command[1] === "d") {
      cd(contents, curDir, inputValue, setCurDir, command);
    } else {
      renderErrorMsg(contents, inputValue);
    }

    window.scrollTo(0, document.body.scrollHeight);
    setInputValue("");
  };

  useEffect(() => {
    input.current?.focus();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.contents} ref={contents} />
      <form
        className={styles.cmd}
        onSubmit={(e) => {
          e.preventDefault();
          executeCmd(inputValue);
        }}
      >
        <p className={styles.user}>guest: ~{curDir}$</p>
        <input
          type="text"
          className={styles.input}
          ref={input}
          autoFocus
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value.toLowerCase());
          }}
        />
      </form>
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
