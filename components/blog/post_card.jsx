import Link from "next/link";
import styles from "./post_card.module.css";

export default function PostCard({ post }) {
  return (
    <div className={styles.container}>
      <Link href={`/blog/${post.slug}`} passHref>
        <a>
          <p className={styles.tag}>
            {post.date} # {post.tag}
          </p>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
        </a>
      </Link>
    </div>
  );
}
