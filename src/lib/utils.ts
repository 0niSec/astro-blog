import { getCollection } from "astro:content";

const posts = (await getCollection("blog")).sort(
  (a, b) => a.data.pubDate.valueOf() - b.data.pubDate.valueOf(),
);

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function getPreviousPost(currentSlug: string) {
  const currentPostIndex = posts.findIndex((p) => p.slug === currentSlug);
  if (currentPostIndex > 0) {
    return posts[currentPostIndex - 1];
  } else {
    return posts[currentPostIndex + 1];
  }
}
