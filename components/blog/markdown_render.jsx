/* eslint-disable react/no-children-prop */
import React, { useRef, useEffect } from "react";
import Markdown from "markdown-to-jsx";
import highlightJs from "highlight.js";
import "highlight.js/styles/a11y-light.css";

export default function MarkdownRender({ content, prefix }) {
  const rootRef = useRef();

  useEffect(() => {
    rootRef.current.querySelectorAll("pre code").forEach((block) => {
      highlightJs.highlightBlock(block);
    });
  }, [content]);
  return (
    <div ref={rootRef}>
      <Markdown>{content.replace("images/", `${prefix}images/`)}</Markdown>
    </div>
  );
}
