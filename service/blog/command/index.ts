import marked from "marked";
import Post from "../../../interface/post";

export default class Command {
  contentsContainer!: HTMLDivElement;
  posts!: Post[];
  curDir: string;
  RootFileList: string[];
  commandList: { cmd: string; desc: string; usage: string }[];
  about: string;

  constructor() {
    this.curDir = "";
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
      "Hi I am Wayne.\n\nI prefer readable code, and maintainable system. I value background more than tools. Like JavaScript. Love TypeScript.\n\nI make web services in the morning and at night, and build boats as a full-time boat builder. Born and raised in South Korea. Living in New Zealand.";
  }

  init(contentsContainer: HTMLDivElement, posts: Post[]) {
    this.contentsContainer = contentsContainer;
    this.posts = posts;
  }

  clear() {
    while (this.contentsContainer.firstChild) {
      this.contentsContainer.firstChild.remove();
    }
    console.log(this.curDir);
  }

  help() {
    this.render("These are commands used in WayneChoi.dev:");

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
    this.contentsContainer.appendChild(newTable);
  }

  ls() {
    switch (this.curDir) {
      case "":
        this.renderList(this.RootFileList);
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
        this.posts.forEach((post, index) => {
          const newRow = newTable.insertRow(index + 1);
          const newCell0 = newRow.insertCell(0);
          newCell0.innerText = `${index}.md`;
          const newCell1 = newRow.insertCell(1);
          newCell1.innerText = `${post.date}`;
          const newCell2 = newRow.insertCell(2);
          newCell2.innerText = `${post.title}`;
        });
        this.contentsContainer.appendChild(newTable);
        break;
    }
  }

  cd(command: string) {
    switch (this.curDir) {
      case "":
        if (command === "cd blog") {
          this.curDir = "/blog";
        } else {
          this.pathError(command, "cd");
        }
        break;
      case "/blog":
        if (command === "cd ..") {
          this.curDir = "";
        } else {
          this.pathError(command, "cd");
        }
        break;
    }
  }

  cat(command: string) {
    const fileName = command.split(" ")[1];
    switch (this.curDir) {
      case "":
        if (fileName === "about" || fileName === "about.txt") {
          this.renderMarkdown(this.about);
        } else {
          this.pathError(command, "cat");
        }
        break;
      case "/blog":
        const indexNumStr = fileName.replaceAll(".md", "");
        let indexNum = parseInt(indexNumStr);
        if (Number.isInteger(parseFloat(indexNumStr))) {
          if (indexNum >= 0 && indexNum < this.posts.length) {
            const h1 = document.createElement("h1");
            h1.innerText = this.posts[indexNum].title;
            this.contentsContainer.appendChild(h1);
            this.render("");
            this.renderMarkdown(this.posts[indexNum].content);
          } else {
            this.pathError(command, "cat");
          }
        } else {
          this.pathError(command, "cat");
        }

        break;
    }
  }

  render(msg: string, marginTop?: number) {
    const newLine = document.createElement("p");
    newLine.innerText = msg;
    if (marginTop) {
      newLine.style.marginTop = `${marginTop}px`;
    }
    this.contentsContainer.appendChild(newLine);
  }

  renderErrorMsg(inputValue: string) {
    const errorMsg = `$ ${inputValue}: command not found. See 'help'.`;
    this.render(errorMsg);
  }

  private renderList(fileList: string[]) {
    fileList.forEach((file) => {
      const newLine = document.createElement("span");
      newLine.innerText = file;
      this.contentsContainer.appendChild(newLine);
    });
  }

  private renderMarkdown(contents: string) {
    const newContents = document.createElement("div");
    newContents.innerHTML = marked(contents);
    this.contentsContainer.appendChild(newContents);
  }

  private pathError(command: string, keyword: string) {
    this.render(
      `$ ${keyword}: Cannot find path '${command
        .split(keyword)[1]
        .replaceAll(" ", "")}' because it does not exist.`
    );
  }
}
