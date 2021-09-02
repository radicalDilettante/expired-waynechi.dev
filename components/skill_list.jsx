import React from "react";
import styles from "./skill_list.module.css";
export default function SkillList(props) {
  return (
    <div className={styles.container}>
      <p className={styles.skill}>{props.skill.name}</p>
      {props.skill.desc && (
        <ul className={styles.desc}>
          {props.skill.desc.map((item) => {
            return <li key={item}>{item}</li>;
          })}
        </ul>
      )}
    </div>
  );
}
