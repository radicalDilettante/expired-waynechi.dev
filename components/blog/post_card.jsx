import Link from "next/link";
import styles from "./post_card.module.css";

export default function PostCard({ post }) {
  return (
    <div className={styles.container}>
      <Link href={`/${post.slug}`}>
        <a>
          <span className={styles.date}>{post.date}</span>
          {post.tag.map((tagItem, index) => (
            <span key={index} className={styles.tag}>
              #{tagItem}
            </span>
          ))}
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
        </a>
      </Link>
    </div>
  );
}
