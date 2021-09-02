import fs from "fs";
import path from "path";
import matter from "gray-matter";
import sortByDate from "../lib/sort_by_date";

export default function getBlogList() {
  const files = fs.readdirSync(path.join("posts"));

  const posts = files.map((filename) => {
    const slug = filename.replace(".md", "");

    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );

    const { data: frontMatter, content } = matter(markdownWithMeta);

    return {
      slug,
      ...frontMatter,
      content,
    };
  });

  return posts.sort(sortByDate);
}
