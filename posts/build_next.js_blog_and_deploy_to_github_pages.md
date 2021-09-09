---
title: "Build Next.js blog and deploy to Github Pages"
date: "Sep 10, 2021"
tag: ["React","Deploy"]
excerpt: 'How I build static blog site with Next.js, and general configuration to deploy to Github Pages in this post...
'
---

Next.js was known as a React framework to support server-side rendering (SSR) with zero config(if not necessary). After recent updates, it supports static generation (SSG) well, too.

To build my own blog, I got two options for React frameworks, one was Next.js, and other was Gatsby. I want to export my blog to static files, and Gatsby is specialized for SSG though, I choose Next.js. There was no reason for me to choose new tech stack, because I already tried Next.js before(for SSR), and I heard SSG in Next.js perform well.

I deployed the static files of my blog to Github Pages, and I needed some configuration. I would record how I build static blog site with Next.js, and general configuration to deploy to Github Pages in this post.

---

## Table of Contents

- Write posts with markdown format
- Get slugs from markdown files
- define path list from slugs
- Parse markdown to html
- Configuration

My code is modularized though, I put all code together in this post to make it easy to explain.

I will skip to import all libraries. The dependency is blow.

```javascript
 "dependencies": {
    "gh-pages": "^3.2.3",
    "gray-matter": "^4.0.3",
    "next": "^11.1.2",
    "react": "17.0.2",
    "react-dom": "17.0.2",
    "react-markdown": "^6.0.3",
    "react-syntax-highlighter": "^15.4.4"
  }
```

---

## Get post list from markdown files

```javascript

export async function getStaticProps() {
  const files = fs.readdirSync(path.join("posts"));
  // read file names from the directory
  // It returns an array

  const posts = files.map((filename) => {

    const slug = filename.replace(".md", "");
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );
    const { data: frontMatter, content } = matter(markdownWithMeta);

    return {
      slug,
      ...frontMatter
    };
  });
  // iterate files to get slug, and parse frontMatter of markdown
  // use "matter" library to parse markdown

  return {
    props: {
      posts,
    },
  };
  // return props to React component
}

export default function Index({ posts }) {
    ...
}
```

Now we got an array including slug of each posts. We can route pages with those slugs.

---

## Get static path from slug

If a page has dynamic routes and uses getStaticProps it needs to define a list of paths that have to be rendered to HTML at build time.

If you export an async function called getStaticPaths from a page that uses dynamic routes, Next.js will statically pre-render all the paths specified by getStaticPaths.

```javascript
// [slug].jsx
// https://localhost:3000/slug

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts"));

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: true,
  };
}
// define a list of paths
```

---

## Parse markdown to html and render

```javascript
// [slug].jsx

...

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join("posts", slug + ".md"),
    "utf-8"
  );
// get a single markdown file with a slug

  const { data: frontMatter, content } = matter(markdownWithMeta);
// parse the markdown file

  return {
    props: { frontMatter, content },
  };
}
// return props to a React Component
// content is html

export default function Blog({ frontMatter: { title }, content}) {
  return (
    <div>
      <h1>{title}</h1>
      <div className={styles.content}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
// Render html with "markdown" library
```

---

## Configuration

To generate static site, and deploy to CDN, we can set up an asset Prefix and configure the CDN's origin to resolve to the domain that Next.js is hosted on.

```javascript
// next.config.js

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  // Use the CDN in production and localhost for development.
  assetPrefix: isProd ? "https://cdn.mydomain.com" : "",
};
```

And I imported the assetPrest to fix image links between pages.

```javascript
// _app.js

import { assetPrefix } from "../next.config";

function MyApp({ Component, pageProps }) {
  const date = new Date();
  return (
      <Component {...pageProps} prefix={assetPrefix} />
  );
}
export default MyApp;

// other pages
<img src={prefix + "imgSrc"}>
```

---

## References

- [https://nextjs.org/](https://nextjs.org/)
- [hhttps://dev.to/jameswallis/](https://dev.to/jameswallis/deploying-a-next-js-app-to-github-pages-24pn)
