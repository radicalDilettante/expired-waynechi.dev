import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GetStaticProps } from "next";
import Post from "../interface/post";
import getBlogList from "../service/blog/get_list";
import styles from "./cli.module.css";
import {
  help,
  cd,
  clear,
  ls,
  render,
  renderErrorMsg,
  cat,
} from "../service/blog/command";

interface IProps {
  posts: Post[];
}

export default function Cli({ posts }: IProps) {
  const router = useRouter();

  const [inputValue, setInputValue] = useState("");
  const [curDir, setCurDir] = useState("");

  const containerElement = useRef<HTMLDivElement>(null);
  const inputElement = useRef<HTMLInputElement>(null);
  const contentsElement = useRef<HTMLDivElement>(null);
  const scrollDown = () => {
    containerElement.current?.scrollTo(
      0,
      containerElement.current.scrollHeight
    );
  };
  const executeCmd = (command: string) => {
    render(contentsElement, `guest: ~${curDir}$ ${inputValue}`, 10);

    if (command === "clear") {
      clear(contentsElement);
    } else if (command === "help") {
      help(contentsElement);
      scrollDown();
    } else if (command === "ls") {
      ls(contentsElement, curDir, inputValue, posts);
      scrollDown();
    } else if (command === "shutdown") {
      router.push("/");
    } else if (command[0] === "c" && command[1] === "d") {
      cd(contentsElement, curDir, setCurDir, command);
      scrollDown();
    } else if (command.split(" ")[0] === "cat") {
      const currentHeight = containerElement.current?.scrollHeight;
      cat(contentsElement, curDir, posts, command);
      if (currentHeight && currentHeight > window.innerHeight) {
        containerElement.current.scrollBy(0, window.innerHeight - 50);
        console.log("A");
      }
    } else {
      renderErrorMsg(contentsElement, inputValue);
      scrollDown();
    }

    setInputValue("");
  };

  useEffect(() => {
    inputElement.current?.focus();
  }, []);
  return (
    <div className={styles.container} ref={containerElement}>
      <div className={styles.contents} ref={contentsElement}>
        <pre className={styles.boat}>
          <code>{`
                                          xxx
                                         xxxxx
                                        x xxx x
                                       x  xxx  x
                                      x   xxx   x
                                     x    xxx    x
                                    x     xxx     x
                                   x      xxx      x
                                  x       xxx       x
                                 x        xxx        x
                                x         xxx         x
                               x          xxx          x
                              x           xxx           x
                             x            xxx            x
                            x             xxx             x
                           x              xxx              x
                          x               xxx               x
                         x                xxx                x
                        x                 xxx                 x                               xxxxxx
                       x                  xxx                  x                              x     xxxxxx
                      x                   xxx                   x                            x      x
                     x                    xxx                    x                         x       x
                    x                     xxx                     x                       x       x
                   x                      xxx                      x                      x      x
                  x                       xxx                       x                    x      x
                 x                        xxx                        x                   x       x
                x                         xxxxxxxxxxxxxxxxxxxxxxxxxxxxx                    x    x
               xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx                                             x    x
                                          xxx                                            x    x
     xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      x                                                                                       x
       x                                                                                     x
        x                                                                                   x
~"^"~-,._.,-~"^"~-,._.,-~"^"~-,._.,-~"^"~-,._.,-~"^"~-,._~"^"~-,._.,-~"^"~-,._.,-~"^"~-,._.,-~"^"~-,._.,-
~-,._.,-~"^"~-,._.,-~"^"~-,._.,-~"^"~-,._.,-~"^"~-,._~"^"~-,._.,-~"^"~-,._.,-~"^"~-,._.,-~"^"~-,._.,-~"^"
~"^"~-,._.,-~"^"~-,._.,-~"^"~-,._.,-~"^"~-,._.,-~"^"~-,._~"^"~-,._.,-~"^"~-,._.,-~"^"~-,._.,-~"^"~-,._.,-
`}</code>
          <code>{`
┌-------------------------------------------------------------------------------------------------------┐
│ xx     xx  xxxxx  xx    xx xxx    xx xxxxxxx  xxxxxx xx   xx  xxxxxx  xx     xxxxxx  xxxxxxx xx    xx │
│ xx     xx xx   xx  xx  xx  xxxx   xx xx      xx      xx   xx xx    xx xx     xx   xx xx      xx    xx │
│ xx  x  xx xxxxxxx   xxxx   xx xx  xx xxxxx   xx      xxxxxxx xx    xx xx     xx   xx xxxxx   xx    xx │
│ xx xxx xx xx   xx    xx    xx  xx xx xx      xx      xx   xx xx    xx xx     xx   xx xx       xx  xx  │
│  xxx xxx  xx   xx    xx    xx   xxxx xxxxxxx  xxxxxx xx   xx  xxxxxx  xx  x  xxxxxx  xxxxxxx   xxxx   │
└-------------------------------------------------------------------------------------------------------┘
`}</code>
        </pre>
        <p>Type 'help' and press 'enter' to get commands list.</p>
      </div>
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
          ref={inputElement}
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
