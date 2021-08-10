import Link from "next/link";
import styles from "./post_card.module.css";

export default function PostCard({ post, prefix }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <div className={styles.container}>
        {post.frontMatter.cover_image && (
          <img
            src={prefix + post.frontMatter.cover_image}
            alt={post.frontMatter.title}
            className={styles.img}
          />
        )}
        <div className={styles.detail}>
          <h3>{post.frontMatter.title}</h3>
          <p>{post.frontMatter.excerpt}</p>
          <div>{post.frontMatter.date}</div>
        </div>
      </div>
    </Link>
  );
}
