import Link from "next/link";
import styles from "./post_card.module.css";

export default function PostCard({ post, prefix }) {
  return (
    <Link href={`/blog/${post.slug}`} passHref>
      <div className={styles.container}>
        <div className={styles.detail}>
          <h3>{post.title}</h3>
          <p>{post.excerpt}</p>
          <div>{post.date}</div>
        </div>
      </div>
    </Link>
  );
}
