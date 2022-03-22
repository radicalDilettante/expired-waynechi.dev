import React, { useEffect, useRef, useState } from "react";
import Giscus from "react-giscus";
interface IProps {
  isDark: boolean;
}

export default function Comment({ isDark }: IProps) {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    if (isDark) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  return (
    <Giscus
      repo="radicalDilettante/waynechoi.dev"
      repoId="MDEwOlJlcG9zaXRvcnkzOTExNTQ0MTI="
      category="General"
      categoryId="DIC_kwDOF1CK7M4CONxN"
      mapping="pathname"
      theme={theme}
      reactionsEnabled="1"
    />
  );
}
