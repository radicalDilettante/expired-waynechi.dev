export default function getPost(markdownWithMeta) {
  const { data: frontMatter, content } = matter(markdownWithMeta);

  return {
    ...frontMatter,
    content,
  };
}
