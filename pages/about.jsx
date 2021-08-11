import styles from "./about.module.css";

export default function About({ prefix }) {
  const useList = [
    { name: "HTML", desc: "semantic markup, DOM manipulation" },
    { name: "CSS", desc: "responsive design, modules, CSS-in-JS" },
    {
      name: "JavaScript",
      desc: "understand core concept lik asynchronous, prototype, closure, context and scope.",
    },
    { name: "React", desc: "" },
  ];

  const renderList = (skill, index) => {
    return (
      <li key={index}>
        <b>{skill.name}</b>
        <br />
        <i>{skill.desc}</i>
      </li>
    );
  };
  return (
    <article className={styles.container}>
      <img className={styles.pic} src={prefix + "images/profile.webp"} />
      <section className={styles.text}>
        <h2>Hi!</h2>
        <p>I am Wayne.</p>
        <p>
          I make web services in the morning and at night, and build boats on
          daytime. Born and raised in Korea. Living in NZ.
        </p>
      </section>
      <section className={styles.text}>
        <h3>I use</h3>
        <ul>{useList.map((skill, index) => renderList(skill, index))}</ul>
      </section>
    </article>
  );
}
