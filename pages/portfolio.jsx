import styles from "../style/portfolio.module.css";
import Head from "next/head";

export default function Portfolio() {
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
      <h2>getting ready</h2>
    </div>
  );
}
