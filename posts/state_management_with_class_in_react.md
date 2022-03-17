---
title: "State management with Class in React"
date: "March 18, 2022"
tag: ["React", "Architecture"]
excerpt: "To implement global state management with class and dependency injection in React application."
---

I implemented a global state management to deal with JWT token and local storage in React application. This post is to share my concerns and how I solved them. The module is class-based. A React library to manage global statement, and window object to get and set local storage is injected from outside the class.

## Why class?

I struggled between class(to deal with action and status together) and function(with objects literal) to manage statements in this application.

If I decoupled to reduce dependence with class, it makes better maintainability, and easier test code. At the same time, it costs a lot to covert states from the class instance to the React library, and from the React library to the class instance.

There are various of dependency for frontend application, such as DOM, React libraries, and window object, so if it is decoupled too deep, the complexity of the application increases incredibly. So, I normally prefer not to use class to manage statement in frontend application.

However, I picked class and dependency injection. All the action about authentication shares same statement, so I thought it costs more to inject all the dependency into every single function. The other reason was that the storage to store user information is different depend on user option. It would be better to be abstracted.

## Recoil?

Even if I manipulate the states in the class, I need to update states of a React library, because the members in the class does not affect DOM rendering in real time.

I choose Recoil at first. But there was an issue. I can only access Recoil atoms in the RecoilRoot component. That means I cannot inject all methods to update Recoil atoms in main component. So I made the Initializer component under RecoilRoot component, and inject all the dependency with an initialization method in Initializer component.

```typescript
//app.tsx
function MyApp({ Component, pageProps }: AppProps) {
  const date = new Date();
  const auth = AuthService.getInstance(urlBase);

  return (
    <RecoilRoot>
      <Initializer auth={auth} date={date} />
      <Layout date={date} auth={auth}>
        <Component {...pageProps} auth={auth} urlBase={urlBase} />
      </Layout>
    </RecoilRoot>
  );
}

//initializer.tsx
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { authState } from "../../../atoms/auth";
import { tokenState } from "../../../atoms/token";
import AuthService from "../../../utils/modules/auth";

interface IProps {
  auth: AuthService;
  date: Date;
}

export default function Initializer({ auth, date }: IProps) {
  const [token, setToken] = useRecoilState(tokenState);
  const [isAuthorized, setIsAuthorized] = useRecoilState(authState);
  useEffect(() => {
    auth.init(setToken, setIsAuthorized, window, date);
  }, []);
  return <></>;
}
```

It is too complex. I thought about another alternative.

## Context API

The higher the level of abstraction, the more difficult it is to customize. I decided to replace Recoil with context API. I did not use FLUX pattern which is the most commonly used with context API, but new pattern.

In the FLUX pattern, both action and states are injected to a Provider. I abstracted all the action to manage state in context with injecting into the class instance, and injected only states and the class instance to a Provider. I mean that it is to decouple all the state management logics.

```typescript
import { createContext, ReactChild, useEffect, useState } from "react";
import AuthService, { AuthStatus } from "../../services/auth/auth";

export interface AuthProviderValue extends AuthStatus {
  service: AuthService;
}
const authServiceInstance = AuthService.getInstance();
const initialStatus: AuthStatus = { token: "", isAuth: "" };
const initialValue: AuthProviderValue = {
  ...initialStatus,
  service: authServiceInstance,
};

export const authContext = createContext<AuthProviderValue>(initialValue);

interface IProps {
  children: ReactChild;
  urlBase: string;
}

const AuthProvider = ({ children, urlBase }: IProps) => {
  const [status, setStatus] = useState<AuthStatus>(initialStatus);

  const date = new Date();
  useEffect(() => {
    authServiceInstance?.init(urlBase, window, date, setStatus);
  }, []);

  const value = {
    service: authServiceInstance,
    token: status.token,
    isAuth: status.isAuth,
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export default AuthProvider;
```

## To be fixed

The branching process to figure out local storage to save user information is abstracted, so hard to be tested with unit tests. The test coverage of this service is about 80% now.

I guess I could decouple this process with another class or static class to decouple.
