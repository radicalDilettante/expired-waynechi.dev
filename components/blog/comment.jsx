import React, { useEffect } from "react";

export default function Comment({ issueTerm = "pathname" }) {
  const rootElm = React.createRef();

  useEffect(() => {
    while (rootElm.current.firstChild) {
      rootElm.current.removeChild(rootElm.current.firstChild);
    }

    const utterances = document.createElement("script");

    Object.entries({
      src: "https://utteranc.es/client.js",
      repo: "waynethebb/waynethebb.github.io",
      "issue-term": issueTerm,
      label: "Comment",
      theme: "github-light",
      crossorigin: "anonymous",
      async: true,
    }).forEach(([key, value]) => {
      utterances.setAttribute(key, value);
    });
    // attach script element
    rootElm.current.appendChild(utterances);
  }, []);

  return <div id="utterances_container" ref={rootElm} />;
}
