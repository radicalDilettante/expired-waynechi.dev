import React, { useLayoutEffect, useState } from "react";
import { AppProps } from "next/app";

import "../style/_app.css";

import Layout from "../components/common/layout";
import { assetPrefix } from "../next.config";
import { useRouter } from "next/router";

import Command from "../service/blog/command";

function MyApp({ Component, pageProps }: AppProps) {
  const [isDark, setIsDark] = useState(false);
  const pathName = useRouter().pathname;
  useLayoutEffect(() => {
    const bgMode = window.localStorage.getItem("bgMode");
    if (bgMode === "light" || !bgMode) {
      setIsDark(false);
    } else {
      setIsDark(true);
    }
  }, []);

  useLayoutEffect(() => {
    if (isDark || pathName === "/cli") {
      document.getElementsByTagName("html")[0].classList.add("dark_theme");
      document.getElementsByTagName("html")[0].classList.remove("light_theme");
    } else {
      document.getElementsByTagName("html")[0].classList.add("light_theme");
      document.getElementsByTagName("html")[0].classList.remove("dark_theme");
    }
  }, [isDark, pathName]);

  const toggleTheme = () => {
    if (isDark) {
      setIsDark(false);
      window.localStorage.setItem("bgMode", "light");
    } else {
      setIsDark(true);
      window.localStorage.setItem("bgMode", "dark");
    }
  };

  const cliCommand = new Command();

  return pathName === "/cli" ? (
    <Component {...pageProps} cliCommand={cliCommand} />
  ) : (
    <Layout prefix={assetPrefix} isDark={isDark}>
      <Component
        {...pageProps}
        prefix={assetPrefix}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />
    </Layout>
  );
}

export default MyApp;
