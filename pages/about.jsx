import styles from "./about.module.css";

export default function About({ prefix }) {
  return (
    <section className={styles.container}>
      <div className={styles.pic}>
        <img src={prefix + "images/profile.webp"} />
      </div>
    </section>
  );
}
