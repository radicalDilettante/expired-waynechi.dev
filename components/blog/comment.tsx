import React, { useEffect, useRef } from "react";

interface IProps {
  issueTerm: string;
  isDark: boolean;
}

export default function Comment({ issueTerm, isDark }: IProps) {
  const rootElm = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let theme: string;
    if (isDark) {
      theme = "github-dark";
    } else {
      theme = "github-light";
    }

    if (rootElm.current) {
      while (rootElm.current.firstChild) {
        rootElm.current.removeChild(rootElm.current.firstChild);
      }

      const utterances = document.createElement("script");

      Object.entries({
        src: "https://utteranc.es/client.js",
        repo: "waynethebb/waynethebb.github.io",
        "issue-term": issueTerm,
        label: "Comment",
        theme,
        crossorigin: "anonymous",
        async: "async",
      }).forEach(([key, value]) => {
        utterances.setAttribute(key, value);
      });
      // attach script element
      rootElm.current!.appendChild(utterances);
    }
  }, []);

  return <div id="utterances_container" ref={rootElm} />;
}
