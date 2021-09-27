/* eslint-disable react/no-children-prop */
import React, { useRef, useEffect } from "react";
import Markdown from "markdown-to-jsx";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

export default function MarkdownRender({ content, prefix }) {
  const rootRef = useRef();

  useEffect(() => {
    rootRef.current.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightBlock(block);
    });
  }, [content]);
  return (
    <div ref={rootRef}>
      <Markdown>{content.replace("images/", `${prefix}images/`)}</Markdown>
    </div>
  );
}
