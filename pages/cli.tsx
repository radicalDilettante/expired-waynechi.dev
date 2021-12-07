import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GetStaticProps } from "next";
import Post from "../interface/post";
import getBlogList from "../service/blog/get_list";
import styles from "../style/cli.module.css";
import Command from "../service/blog/command";

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
  const contentsContainer = contentsElement.current!;
  const scrollDown = () => {
    containerElement.current?.scrollTo(
      0,
      containerElement.current.scrollHeight
    );
  };
  const cliCommand = new Command();

  const executeCmd = (command: string) => {
    cliCommand.render(
      contentsContainer,
      `guest: ~${curDir}$ ${inputValue}`,
      10
    );

    if (command === "clear") {
      cliCommand.clear(contentsContainer);
    } else if (command === "help") {
      cliCommand.help(contentsContainer);
      scrollDown();
    } else if (command === "ls") {
      cliCommand.ls(contentsContainer, curDir, inputValue, posts);
      scrollDown();
    } else if (command === "shutdown") {
      router.push("/");
    } else if (command[0] === "c" && command[1] === "d") {
      cliCommand.cd(contentsContainer, curDir, setCurDir, command);
      scrollDown();
    } else if (command.split(" ")[0] === "cat") {
      const currentHeight = containerElement.current?.scrollHeight;
      cliCommand.cat(contentsContainer, curDir, posts, command);
      if (currentHeight && currentHeight > window.innerHeight) {
        containerElement.current.scrollBy(0, window.innerHeight - 50);
        console.log("A");
      }
    } else {
      cliCommand.renderErrorMsg(contentsContainer, inputValue);
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
