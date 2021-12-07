import React from "react";
import marked from "marked";

import Post from "../../../interface/post";

export default class Command {
  RootFileList: string[];
  commandList: { cmd: string; desc: string; usage: string }[];
  about: string;
  renderList: (
    contentsElement: React.RefObject<HTMLDivElement>,
    fileList: string[]
  ) => void;
  renderMarkdown: (
    contentsElement: React.RefObject<HTMLDivElement>,
    contents: string
  ) => void;
  pathError: (
    contentsElement: React.RefObject<HTMLDivElement>,
    command: string,
    keyword: string
  ) => void;

  constructor() {
    this.RootFileList = ["blog", "about.txt"];
    this.commandList = [
      {
        cmd: "help",
        desc: "get help for commands",
        usage: "$ help",
      },
      {
        cmd: "ls",
        desc: "print a list of files and subdirectories",
        usage: "$ ls",
      },
      {
        cmd: "cd",
        desc: "change directory",
        usage: `$ cd blog
        $ cd ..`,
      },
      {
        cmd: "cat",
        desc: "display contents of file",
        usage: "$ cat about(.txt)",
      },
      {
        cmd: "clear",
        desc: "clear the terminal screen",
        usage: "$ clear",
      },
      {
        cmd: "shutdown",
        desc: "shutdown cli mode",
        usage: "$ shutdown",
      },
    ];
    this.about =
      "Hi I am Wayne.\n\nI prefer readable code, and maintainable system. I value background more than tools. Love JavaScript. Like TypeScript.\n\nI make web services in the morning and at night, and build boats as a full-time boat builder. Born and raised in South Korea. Living in New Zealand.";
    this.renderList = (
      contentsElement: React.RefObject<HTMLDivElement>,
      fileList: string[]
    ) => {
      fileList.forEach((file) => {
        const newLine = document.createElement("span");
        newLine.innerText = file;
        contentsElement.current?.appendChild(newLine);
      });
    };
    this.renderMarkdown = (
      contentsElement: React.RefObject<HTMLDivElement>,
      contents: string
    ) => {
      const newContents = document.createElement("div");
      newContents.innerHTML = marked(contents);
      contentsElement.current?.appendChild(newContents);
    };
    this.pathError = (
      contentsElement: React.RefObject<HTMLDivElement>,
      command: string,
      keyword: string
    ) => {
      this.render(
        contentsElement,
        `$ ${keyword}: Cannot find path '${command
          .split(keyword)[1]
          .replaceAll(" ", "")}' because it does not exist.`
      );
    };
  }

  clear(contentsElement: React.RefObject<HTMLDivElement>) {
    while (contentsElement.current?.firstChild) {
      contentsElement.current?.firstChild.remove();
    }
  }

  help(contentsElement: React.RefObject<HTMLDivElement>) {
    this.render(contentsElement, "These are commands used in WayneChoi.dev:");

    const newTable = document.createElement("table");
    const newHeader = newTable.createTHead();
    const headerRow = newHeader.insertRow(0);
    const headerCell0 = headerRow.insertCell(0);
    headerCell0.innerText = "command";
    const headerCell1 = headerRow.insertCell(1);
    headerCell1.innerText = "description";
    const headerCell2 = headerRow.insertCell(2);
    headerCell2.innerText = "usage";

    this.commandList.forEach((command, index) => {
      const newRow = newTable.insertRow(index + 1);
      const newCell0 = newRow.insertCell(0);
      newCell0.innerText = `${command.cmd}`;
      const newCell1 = newRow.insertCell(1);
      newCell1.innerText = `${command.desc}`;
      const newCell2 = newRow.insertCell(2);
      newCell2.innerText = `${command.usage}`;
    });
    contentsElement.current?.appendChild(newTable);
  }

  ls(
    contentsElement: React.RefObject<HTMLDivElement>,
    curDir: string,
    inputValue: string,
    posts: Post[]
  ) {
    switch (curDir) {
      case "":
        this.renderList(contentsElement, this.RootFileList);
        break;
      case "/blog":
        const newTable = document.createElement("table");
        const newHeader = newTable.createTHead();
        const headerRow = newHeader.insertRow(0);
        const headerCell0 = headerRow.insertCell(0);
        headerCell0.innerText = "file";
        const headerCell1 = headerRow.insertCell(1);
        headerCell1.innerText = "date";
        const headerCell2 = headerRow.insertCell(2);
        headerCell2.innerText = "subject";
        posts.forEach((post, index) => {
          const newRow = newTable.insertRow(index + 1);
          const newCell0 = newRow.insertCell(0);
          newCell0.innerText = `${index}.md`;
          const newCell1 = newRow.insertCell(1);
          newCell1.innerText = `${post.date}`;
          const newCell2 = newRow.insertCell(2);
          newCell2.innerText = `${post.title}`;
        });
        contentsElement.current?.appendChild(newTable);
        break;
      default:
        this.renderErrorMsg(contentsElement, inputValue);
        break;
    }
  }

  cd(
    contentsElement: React.RefObject<HTMLDivElement>,
    curDir: string,
    setCurDir: Function,
    command: string
  ) {
    switch (curDir) {
      case "":
        if (command === "cd blog") {
          setCurDir("/blog");
        } else {
          this.pathError(contentsElement, command, "cd");
        }
        break;
      case "/blog":
        if (command === "cd.." || command === "cd ..") {
          setCurDir("");
        } else {
          this.pathError(contentsElement, command, "cd");
        }
        break;
    }
  }

  cat(
    contentsElement: React.RefObject<HTMLDivElement>,
    curDir: string,
    posts: Post[],
    command: string
  ) {
    const fileName = command.split(" ")[1];
    switch (curDir) {
      case "":
        if (fileName === "about" || fileName === "about.txt") {
          this.renderMarkdown(contentsElement, this.about);
        } else {
          this.pathError(contentsElement, command, "cat");
        }
        break;
      case "/blog":
        const indexNumStr = fileName.replaceAll(".md", "");
        let indexNum = parseInt(indexNumStr);
        if (Number.isInteger(parseFloat(indexNumStr))) {
          if (indexNum >= 0 || indexNum < posts.length) {
            const h1 = document.createElement("h1");
            h1.innerText = posts[indexNum].title;
            contentsElement.current?.appendChild(h1);
            this.render(contentsElement, "");
            this.renderMarkdown(contentsElement, posts[indexNum].content);
          } else {
            this.pathError(contentsElement, command, "cat");
          }
        } else {
          this.pathError(contentsElement, command, "cat");
        }

        break;
    }
  }

  render(
    contentsElement: React.RefObject<HTMLDivElement>,
    msg: string,
    marginTop?: number
  ) {
    const newLine = document.createElement("p");
    newLine.innerText = msg;
    if (marginTop) {
      newLine.style.marginTop = `${marginTop}px`;
    }
    contentsElement.current?.appendChild(newLine);
  }

  renderErrorMsg(
    contentsElement: React.RefObject<HTMLDivElement>,
    inputValue: string
  ) {
    const errorMsg = `$ ${inputValue}: command not found. See 'help'.`;
    this.render(contentsElement, errorMsg);
  }
}
