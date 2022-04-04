---
title: "Method returning callback with this for event handler"
date: "Apr 4, 2022"
tag: ["Web", "Cookie", "JavaScript"]
excerpt: "I met a trobule about this in a method returning callback for event handler. I fixed it with static method and other hack."
---

All code is not real codes, but abstracted to understand this issue easily.

```TypeScript
export default class SignUpService {
  private urlBase: string;

  constructor(urlBase: string) {
    this.urlBase = urlBase;
  }

  public usernameFilter = () => {
    return async (username: string) => {
      // skip

      console.log(this.urlBase)
      return `The username, ${username}, is already exist.`;
    };
  };
}

// this was undefined when usernameFilter method was called in event handler.
```

usernameFilter method return an async callback, and it is called in DOM event handler. this in event handler is unexpected and not under my control. In the case of this project, this was undefined.

## Static Method

```TypeScript
export default class SignUpService {

  static usernameFilter = (urlBase: string) => {
    return async (username: string) => {
      // skip

      console.log(urlBase)
      return `The username, ${username}, is already exist.`;
    };
  };
}
```

At first, I made all methods static, and injected all dependency as a parameter. The code above is quite simple, but real code was not. There were plenty of duplicated codes.

That was not cool.

## this in arrow function

this is set when execution of method or function. However, this in arrow function is set when the function is declared.

The async callback returned in usernameFilter method is declared in the rendering method of React library in this project. I am not sure how it works, and I could not help it.

```TypeScript
export default class SignUpService {
  private urlBase: string;

  constructor(urlBase: string) {
    this.urlBase = urlBase;
  }

  public usernameFilter = () => {
    const urlBase = this.urlBase

    return async (username: string) => {
      // skip

      console.log(urlBase)
      return `The username, ${username}, is already exist.`;
    };
  };
}
```

So I re-declare member, I need, in usernameFilter methods, and use it in the callback returned. usernameFilter method is declared when making an instance of the class, so this should be the instance.
