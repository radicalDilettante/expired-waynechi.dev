import styles from "./about.module.css";
import Head from "next/head";

import SkillList from "../components/skill_list";

export default function About({ prefix }) {
  const useList = [
    {
      name: "HTML, CSS",
      desc: ["Semantic markup", "DOM manipulation", "Responsive design"],
    },
    {
      name: "JavaScript",
      desc: [
        "Core concept like asynchronous, prototype, closure, context and scope",
      ],
    },
    {
      name: "React",
      desc: [
        "Make encapsulated functional components with hooks",
        "SSR and SSG with Next.js",
        "Manage global state with contextAPI",
        "Understand core concept like JSX, props, and virtual DOM",
      ],
    },
    {
      name: "TypeScript",
      desc: ["Make type safe code", "Object oriented programming"],
    },
  ];
  const learnList = [
    {
      name: "Node.js, express",
      desc: ["Rest API", "Simple backend service", "Understand web more"],
    },
  ];
  return (
    <article className={styles.container}>
      <Head>
        <title>About - WayneChoi.dev</title>
        <meta name="author" content="Wayne Choi" />
        <meta name="description" content="Profile of Wayne Choi" />
        <meta
          name="keywords"
          content="javascript, react, frontend, developer"
        />
      </Head>
      <img
        className={styles.pic}
        src={prefix + "images/profile.webp"}
        alt={"Wonjun Wayne Choi"}
      />
      <section className={styles.greeting}>
        <h2 className={styles.sub_heading}>Hi!</h2>
        <p>I am Wayne.</p>
        <p>
          I prefer readable code, and maintainable system. Value background more
          than tools. Love JS. Like TS.
        </p>
        <p>
          <img src={prefix + "images/profile_small.webp"} />I make web services
          in the morning and at night, and build boats on daytime. Born and
          raised in South Korea. Living in New Zealand.
        </p>
      </section>
      <hr />
      <section>
        <h2 className={styles.sub_heading}>I use</h2>
        {useList.map((skill, index) => (
          <SkillList skill={skill} key={index} />
        ))}
        <hr />
        <h2 className={styles.sub_heading}>I am learning</h2>
        {learnList.map((skill, index) => (
          <SkillList skill={skill} key={index} />
        ))}
      </section>
    </article>
  );
}
