import styles from "../style/about.module.css";
import Head from "next/head";

interface IProps {
  prefix: string;
}

export default function About({ prefix }: IProps) {
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
      <section className={styles.link}>
        <a href="https://github.com/radicalDilettante" target="_blank">
          <img src="./images/icon/github.svg" />
        </a>
      </section>
      <section className={styles.greeting}>
        <h2 className={styles.sub_heading}>Hi!</h2>
        <p>I am Wayne, living in NZ.</p>
        <p>
          I make web services in the morning and at night, and build boats as a
          full-time boat builder.
        </p>
        <p>
          I prefer readable code, and maintainable system. I value background
          more than tools.
        </p>
        <p>Like JavaScript, and Love TypeScript.</p>
        <p>You can get in touch with me at wonjun92@gmail.com.</p>
      </section>
    </article>
  );
}
