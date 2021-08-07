import Link from "next/link";
import styles from "./post_card.module.css";

export default function PostCard({ post, prefix }) {
  return (
    <div>
      <img
        src={prefix + post.frontMatter.cover_image}
        alt=""
        className={styles.img}
      />

      <div>Posted on {post.frontMatter.date}</div>

      <h3>{post.frontMatter.title}</h3>

      <p>{post.frontMatter.excerpt}</p>

      <Link href={`/blog/${post.slug}`}>
        <a>Read More</a>
      </Link>
    </div>
  );
}
