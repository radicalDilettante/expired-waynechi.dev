/* eslint-disable react/no-children-prop */
import React, { useRef, useEffect } from "react";
import Markdown from "markdown-to-jsx";
import highlightJs from "highlight.js";
import "highlight.js/styles/a11y-dark.css";

interface IProps {
  content: string;
  prefix: string;
}

export default function MarkdownRender({ content, prefix }: IProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (rootRef.current) {
      rootRef.current
        .querySelectorAll<HTMLElement>("pre code")
        .forEach((block) => {
          highlightJs.highlightElement(block);
        });
    }
  }, [content]);
  return (
    <div ref={rootRef}>
      <Markdown>{content.replace("images/", `${prefix}images/`)}</Markdown>
    </div>
  );
}
