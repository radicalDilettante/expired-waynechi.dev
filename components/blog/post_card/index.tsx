import Link from "next/link";
import Post from "../../../interface/post";
import styles from "./style.module.css";

interface IProps {
  post: Post;
}

export default function PostCard({ post }: IProps) {
  return (
    <div className={styles.container}>
      <Link href={`/expired-waynechi.dev/${post.slug}`}>
        <a>
          <div className={styles.header}>
            <span className={styles.date}>{post.date}</span>
            <span className={styles.tagWrapper}>
              {post.tag.map((tagItem, index) => (
                <span key={index} className={styles.tag}>
                  #{tagItem}
                </span>
              ))}
            </span>
          </div>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
        </a>
      </Link>
    </div>
  );
}
