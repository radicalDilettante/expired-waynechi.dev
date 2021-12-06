import React, { useState } from "react";
import styles from "./style.module.css";

interface IProps {
  tag: string;
  selected: string[];
  setSelected: Function;
  numberByTag: Function;
}

export default function TagListItem({
  tag,
  selected,
  setSelected,
  numberByTag,
}: IProps) {
  const [isActive, setIsActive] = useState(false);

  const toggleActive = () => {
    if (isActive) {
      setIsActive(false);
      setSelected(
        selected.filter((item) => {
          return item != tag;
        })
      );
    } else {
      setIsActive(true);

      const newTagList = [...selected];
      newTagList.push(tag);
      setSelected(newTagList);
    }
  };
  return (
    <li
      className={styles.container}
      onClick={() => {
        toggleActive();
      }}
    >
      <span className={isActive ? styles.active : styles.inactive}>
        {tag} ({numberByTag(tag)}) {isActive && "x"}
      </span>
    </li>
  );
}
