import Link from "next/link";
import styles from "./post_card.module.css";

export default function PostCard({ post, prefix }) {
  return (
    <div className={styles.container}>
      <p className={styles.tag}># {post.tag}</p>
      <div className={styles.detail}>
        {post.cover_image && (
          <img
            src={prefix + post.cover_image}
            alt={post.title}
            className={styles.img}
          />
        )}
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
      </div>
      <Link href={`/blog/${post.slug}`} passHref>
        <a className={styles.link}>&gt; Read More</a>
      </Link>
    </div>
  );
}
