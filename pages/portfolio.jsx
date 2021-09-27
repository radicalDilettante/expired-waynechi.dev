import styles from "./portfolio.module.css";
import Head from "next/head";

export default function Portfolio({ prefix }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Search - WayneChoi.dev</title>
        <meta name="author" content="Wayne Choi" />
        <meta name="description" content="Portfolio of Wayne Choi." />
        <meta
          name="keywords"
          content="javascript, react, frontend, developer"
        />
      </Head>
      <h1>Portfolio</h1>
      <h2>Website</h2>
      <img className={styles.img} src={prefix + "images/portfolio/blog.jpg"} />
      <img
        className={styles.img_m}
        src={prefix + "images/portfolio/blog_m.jpg"}
      />
    </div>
  );
}
