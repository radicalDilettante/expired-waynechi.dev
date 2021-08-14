import Link from "next/link";
import styles from "./post_card.module.css";

export default function PostCard({ post, prefix }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <div className={styles.container}>
        {post.cover_image && (
          <img
            src={prefix + post.cover_image}
            alt={post.title}
            className={styles.img}
          />
        )}
        <div className={styles.detail}>
          <h3>{post.title}</h3>
          <p>{post.excerpt}</p>
          <div>{post.date}</div>
        </div>
      </div>
    </Link>
  );
}
