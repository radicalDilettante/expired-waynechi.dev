---
title: "Prevent to make instance repeatedly in react component"
date: "Dec 15, 2021"
tag: ["React", "Issue"]
excerpt: "I had an issue to make instance repeatedly in react component, and fixed it."
---

All code is not real codes, but abstracted to understand this issue easily.

```javascript
// service/command.ts
export default class Command {
  contentsContainer: HTMLDivElement;
  posts: Post[];
  curDir: string;

  constructor(contentsContainer: HTMLDivElement, posts: Post[]) {
    this.contentsContainer = contentsContainer;
    this.posts = posts;
    this.curDir = "";
  }

  cd() {
    switch (this.curDir) {
      case "":
        this.curDir = "/dir";
        break;

      case "/dir":
        this.curDir = "";
        break;
    }
  }
}

// pages/cli.tsx
export default function Cli({ posts }: IProps) {

  const [curDir, setCurDir] = useState("");

  const contentsElement = useRef<HTMLDivElement>(null);
  const contentsContainer = contentsElement.current!;

  const cliCommand = new Command(contentsContainer, posts);

  const changeDirectory = () => {
      cliCommand.cd(command);
      setCurDir(cliCommand.curDir);
  };
  return (
      ...
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

```

This code is to implement cli command for my tech blog. It works well in unit testing, but I had an issue when user testing. Even if I change this.curDir member in cliCommand instance to the string "/dir", it keep changing to an empty string again.

The reason was the react component keep making new instance whenever the life cycle of itself was changed. I set the member, this.curDir, the empty string in constructor method, so it kept changing to empty string.

I wanted to make an instance of Command class in the main component, \_app.tsx, then inject the dependency into cli page component, but I can not access the arguments for constructor method, HTMLDivElement, and pages, in the main component. Because the business logic of getting pages need to access file system, but the main component of next.js was not supported for server-side.

```javascript

// service/command.ts
export default class Command {
  contentsContainer!: HTMLDivElement;
  posts!: Post[];
  curDir: string;

  constructor() {
    this.curDir = "";
  }

  init(contentsContainer: HTMLDivElement, posts: Post[]) {
    this.contentsContainer = contentsContainer;
    this.posts = posts;
  }

  cd() {
    switch (this.curDir) {
      case "":
        this.curDir = "/dir";
        break;

      case "/dir":
        this.curDir = "";
        break;
    }
  }
}


// pages/_app.tsx
import Command from "../service/blog/command";

function MyApp({ Component, pageProps }: AppProps) {
  const cliCommand = new Command();
  return <Component {...pageProps} cliCommand={cliCommand} />
}

export default MyApp;


// pages/cli.tsx
export default function Cli({ cliCommand, posts }: IProps) {

  const [curDir, setCurDir] = useState("");

  const contentsElement = useRef<HTMLDivElement>(null);
  const contentsContainer = contentsElement.current!;

  const changeDirectory = () => {
      cliCommand.cd(command);
      setCurDir(cliCommand.curDir);
  };

 useEffect(() => {
    cliCommand.init(contentsContainer, posts);
  }, [contentsContainer, posts]);

  return (
      ...
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

```

To figure it out, I removed all the arguments from the constructor method, and added an init method to set HTMLDivElement and pages members. Then I made an instance in main component, and pass it to the page component.
