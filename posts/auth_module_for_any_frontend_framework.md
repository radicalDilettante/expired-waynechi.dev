---
title: "Auth Module for any frontend framework"
date: "Mar 29, 2022"
tag: ["TypeScript", "Authentication"]
excerpt: "I implemented a framework free frontend authentication module with TypeScript."
---

I implemented an authentication module, and it is not dependent to any framework or library. It is made with TS class, so it has its own status. I injected all the dependency to update state of frontend framework, and local storage.

I described in more detail why I used classes rather than functions, in the link below.

["State management with Class in React"](https://waynechoi.dev/state_management_with_class_in_react)

## Singleton pattern

The class of this module should be initialized only once in an application. Otherwise, it could not be guaranteed to cause unintended change of status. For example, if I create an instance with constructor method on main component of React, the constructor method could be called multiple times from re-rendering the component. (I met this issue that the main component when I wrap the main component of React with RecoilRoot component of Recoil library) So I chose singleton pattern to create only one instance.

```typescript
export default class AuthService {
  static _instance: AuthService;

  private constructor() {}

  public static getInstance() {
    return this._instance || (this._instance = new this());
  }
}
```

## Initialize

init() method is to inject dependencies and initialize status, and local storage.
I injected URL Base for API endpoint, window object to manage local storage, date object, and a function to update framework level status.

```typescript
export default class AuthService {
  // skip

  private urlBase!: string;
  private date!: Date;
  private setStatus!: Function;
  private window!: Window;

  public async init(
    urlBase: string,
    window: Window,
    date: Date,
    setStatus: Function
  ) {
    this.urlBase = urlBase;
    this.setStatus = setStatus;
    this.window = window;
    this.date = date;
  }
}
```

## Sign In

signIn() method is to sign in. It sends a request with user information, and get a response from backend API server. Its parameters are username, password, and isChecked. isChecked is a boolean. User information is stored in local storage if it is true, but session storage if it is false.

It branch out according to the status code of the response. If it is not 2xx, it returns an error message. If it is 2xx, it calls three private methods.

setMembersFromResponse() is to set members with user information from the response. this.stored is for which storage to store.

setStorageFromMembers() is to set local storage or session storage with user information from members of the class.

update() is to set token to status of external library with setStatus which is injected dependency in init() method.

```typescript
type SignInResult = {
  message?: string;
  accessToken: string;
  refreshToken: string;
  expiredTime: string;
  userId: string;
};

export type AuthStatus = {
  token: string;
  isAuth: "yes" | "no" | "";
};

export default class AuthService {
  // skip

  private accessToken?: string;
  private refreshToken?: string;
  private expiredTime?: string;
  private userId?: string;
  private stored?: "localStorage" | "sessionStorage";
  private isAuth?: "yes" | "no" | "";

  public async signIn(
    username: string,
    password: string,
    isChecked: boolean
  ): Promise<string | undefined> {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        username,
        password,
      }),
    };

    const response = await fetch(
      `${this.urlBase}/auth/sign_in`,
      requestOptions
    );
    const result: SignInResult = await response.json();
    if (response.status > 199 && response.status < 300) {
      this.setMembersFromResponse(result, isChecked);
      this.setStorageFromMembers();
      this.update();
      return "success";
    } else {
      return result.message;
    }
  }

  private setMembersFromResponse(result: SignInResult, isChecked?: boolean) {
    this.accessToken = result.accessToken;
    this.refreshToken = result.refreshToken;
    this.expiredTime = result.expiredTime;
    this.userId = result.userId;
    if (typeof isChecked === "boolean") {
      this.stored = isChecked ? "localStorage" : "sessionStorage";
    }

    this.isAuth = "yes";
  }

  private setStorageFromMembers() {
    window.localStorage.setItem("stored", this.stored!);
    window[this.stored!].setItem("accessToken", this.accessToken!);
    window[this.stored!].setItem("refreshToken", this.refreshToken!);
    window[this.stored!].setItem("expiredTime", this.expiredTime!);
    window[this.stored!].setItem("userId", this.userId!);
  }

  private update() {
    const status: AuthStatus = {
      token: this.accessToken!,
      isAuth: this.isAuth!,
    };
    this.setStatus(status);
  }
}
```

## Sign Out

signOut() method is to sign out. It get which storage the user information is stored in, and clean local or session storage and members about user information. Then it calls update() method to update the status of external library.

```typescript
// skip

export default class AuthService {
  // skip

  public signOut() {
    const storage = this.window.localStorage.getItem("stored")
      ? "localStorage"
      : "sessionStorage";

    this.window[storage].removeItem("accessToken");
    this.window[storage].removeItem("refreshToken");
    this.window[storage].removeItem("expiredTime");
    this.window[storage].removeItem("userId");
    this.window.localStorage.removeItem("stored");

    this.accessToken = undefined;
    this.refreshToken = undefined;
    this.expiredTime = undefined;
    this.userId = undefined;
    this.isAuth = "no";
    this.update();
  }
}
```

## Getter method of user id

getUserId() method is a getter method to return userId member.

```typescript
// skip

export default class AuthService {
  // skip

  public getUserId() {
    return this.userId;
  }
}
```

## Initialize after signing in

I add some more logic in the init() method. After all dependency injection, I set members from local or session storage with setMembersFromStorage() the private method.

It checks expired time of access token with isAccessTokenExpired() the private method. If its access token is expired, it send a request with a refresh token to re-issue access token. reIssueToken() method got a same branching process of signIn() method.

Then it updates the status of external library.

```typescript
// skip

export default class AuthService {
  // skip

  public async init(urlBase: string, window: Window, date: Date, setStatus: Function) {
    // skip

    this.setMembersFromStorage();

    if (this.expiredTime) {
      const isAuth = !this.isAccessTokenExpired(this.expiredTime);
      // if it is expired, it is not authorized.
      if (isAuth) {
        this.isAuth = 'yes';
        this.update();
      } else {
        await this.reIssueToken(this.userId!, this.refreshToken!);
      }
    } else {
      this.isAuth = 'no';
      this.update();
    }
    //skip

  private setMembersFromStorage() {
    const storage =
      window.localStorage.getItem('stored') === 'localStorage' ? 'localStorage' : 'sessionStorage';

    this.stored = storage;
    this.accessToken = window[storage].getItem('accessToken')!;
    this.refreshToken = window[storage].getItem('refreshToken')!;
    this.expiredTime = window[storage].getItem('expiredTime')!;
    this.userId = window[storage].getItem('userId')!;
  }

  private async reIssueToken(userId: string, refreshToken: string): Promise<void> {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        userId,
        refreshToken,
      }),
    };
    const response = await fetch(`${this.urlBase}/auth/reissue_token`, requestOptions);
    const result: SignInResult = await response.json();
    if (response.status > 199 && response.status < 300) {
      this.setMembersFromResponse(result);
      this.setStorageFromMembers();
      this.update();
    } else {
      this.signOut();
    }
  }

  private isAccessTokenExpired(expiredTime: string) {
    if (this.date!.getTime() >= parseInt(expiredTime)) {
      return true;
    } else {
      return false;
    }
  }

}
```

## To be fixed

The branching process to figure out which local storage to save user information is abstracted with private methods. So It is hard to be tested. The test coverage of this service is about 80% now.

I guess I could decouple this process with another class or static class.
