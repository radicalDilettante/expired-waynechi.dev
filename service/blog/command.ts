import Post from "../../interface/post";

const RootFileList = ["blog", "portfolio", "about.txt"];
const PortfolioFileList = ["empty"];
const commandList = [
  {
    cmd: "ls",
    desc: "print a list of files and subdirectories",
    usage: "$ ls",
  },
  { cmd: "cat", desc: "display contents of file", usage: "$ cat about(.txt)" },
];
const renderList = (
  contents: React.RefObject<HTMLDivElement>,
  fileList: string[]
) => {
  fileList.forEach((file) => {
    const newLine = document.createElement("span");
    newLine.innerText = file;
    contents.current?.appendChild(newLine);
  });
};
const cdError = (
  contents: React.RefObject<HTMLDivElement>,
  command: string
) => {
  render(
    contents,
    `cd: Cannot find path '${command
      .split("cd")[1]
      .replaceAll(" ", "")}' because it does not exist.`
  );
};

export const clear = (contents: React.RefObject<HTMLDivElement>) => {
  while (contents.current?.firstChild) {
    contents.current?.firstChild.remove();
  }
};

export const help = (contents: React.RefObject<HTMLDivElement>) => {
  render(contents, "These are commands used in WayneChoi.dev:");

  const newTable = document.createElement("table");
  const newHeader = newTable.createTHead();
  const headerRow = newHeader.insertRow(0);
  const headerCell0 = headerRow.insertCell(0);
  headerCell0.innerText = "command";
  const headerCell1 = headerRow.insertCell(1);
  headerCell1.innerText = "description";
  const headerCell2 = headerRow.insertCell(2);
  headerCell2.innerText = "usage";
  commandList.forEach((command, index) => {
    const newRow = newTable.insertRow(index + 1);
    const newCell0 = newRow.insertCell(0);
    newCell0.innerText = `${command.cmd}`;
    const newCell1 = newRow.insertCell(1);
    newCell1.innerText = `${command.desc}`;
    const newCell2 = newRow.insertCell(2);
    newCell2.innerText = `${command.usage}`;
  });
  contents.current?.appendChild(newTable);
};

export const ls = (
  contents: React.RefObject<HTMLDivElement>,
  curDir: string,
  inputValue: string,
  posts: Post[]
) => {
  switch (curDir) {
    case "":
      renderList(contents, RootFileList);
      break;
    case "/blog":
      const newTable = document.createElement("table");
      const newHeader = newTable.createTHead();
      const headerRow = newHeader.insertRow(0);
      const headerCell0 = headerRow.insertCell(0);
      headerCell0.innerText = "index";
      const headerCell1 = headerRow.insertCell(1);
      headerCell1.innerText = "date";
      const headerCell2 = headerRow.insertCell(2);
      headerCell2.innerText = "subject";
      posts.forEach((post, index) => {
        const newRow = newTable.insertRow(index + 1);
        const newCell0 = newRow.insertCell(0);
        newCell0.innerText = `${index}`;
        const newCell1 = newRow.insertCell(1);
        newCell1.innerText = `${post.date}`;
        const newCell2 = newRow.insertCell(2);
        newCell2.innerText = `${post.title}`;
      });
      contents.current?.appendChild(newTable);
      break;
    case "/portfolio":
      renderList(contents, PortfolioFileList);
      break;
    default:
      renderErrorMsg(contents, inputValue);
  }
};

export const cd = (
  contents: React.RefObject<HTMLDivElement>,
  curDir: string,
  inputValue: string,
  setCurDir: React.Dispatch<React.SetStateAction<string>>,
  command: string
) => {
  if (curDir === "") {
    if (command === "cd blog") {
      setCurDir("/blog");
    } else if (command === "cd portfolio") {
      setCurDir("/portfolio");
    } else {
      cdError(contents, command);
    }
  } else if (curDir === "/blog" || curDir === "/portfolio") {
    if (command === "cd.." || command === "cd ..") {
      setCurDir("");
    } else {
      cdError(contents, command);
    }
  }
};

export const render = (
  contents: React.RefObject<HTMLDivElement>,
  msg: string,
  marginTop?: number
) => {
  const newLine = document.createElement("p");
  newLine.innerText = msg;
  if (marginTop) {
    newLine.style.marginTop = `${marginTop}px`;
  }
  contents.current?.appendChild(newLine);
};

export const renderErrorMsg = (
  contents: React.RefObject<HTMLDivElement>,
  inputValue: string
) => {
  const errorMsg = `${inputValue}: command not found. See 'help'.`;
  render(contents, errorMsg);
};
