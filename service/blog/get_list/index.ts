import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default function getBlogList() {
  const files = fs.readdirSync(path.join("posts"));

  const posts = files.map((filename) => {
    const slug = filename.replace(".md", "");

    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );

    const { data: frontMatter, content } = matter(markdownWithMeta);
    const { title, date, excerpt }: { [key: string]: string } = frontMatter;
    const { tag }: { [eky: string]: string[] } = frontMatter;

    return {
      slug,
      title,
      date,
      tag,
      excerpt,
      content,
    };
  });

  return posts.sort((a, b): number => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}
