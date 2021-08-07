import styles from "./index.module.css";
import Animation from "../components/home/animation";

export default function Home() {
  return (
    <div className={styles.box}>
      <Animation />
    </div>
  );
}
