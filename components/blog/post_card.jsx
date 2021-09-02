import Link from "next/link";
import styles from "./post_card.module.css";

export default function PostCard({ post, prefix }) {
  return (
    <div className={styles.container}>
      <ul className={styles.tag}>
        {post.tag.map((item, index) => {
          return <li key={index}>{`# ${item}`}</li>;
        })}
      </ul>
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
      </div>
      <Link href={`/blog/${post.slug}`} passHref>
        <a className={styles.link}>&gt; Read More</a>
      </Link>
    </div>
  );
}
