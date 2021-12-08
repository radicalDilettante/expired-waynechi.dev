export default interface Post {
  prefix?: string;
  content: string;
  title: string;
  date: string;
  tag: string;
  excerpt: string;
  slug?: string;
}
