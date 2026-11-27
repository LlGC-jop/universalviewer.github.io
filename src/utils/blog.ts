import type { Locale } from '@config/site';
import { siteConfig } from '@config/site';
import type { Lang } from "@i18n/ui";
import { getCollection, type CollectionEntry, type DataEntryMap } from 'astro:content';

export async function getLocalisedBlogPosts(locale: Locale) {
  const posts = await getAllBlogPosts();
  const groupedPosts = groupBlogPosts(posts);
  const localisedPosts = localiseBlogPosts(locale, groupedPosts);

  return localisedPosts;
}

async function getAllBlogPosts() {
  const posts = (await getCollection("blog")).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );

  return posts;
}

function groupBlogPosts(posts: CollectionEntry<"blog">[]) {
  const grouped = Object.groupBy(posts, (post) =>
    post.id.split("/").slice(1).join("/")
  );

  return grouped;
}

function localiseBlogPosts(locale: Locale, posts: Partial<Record<string, CollectionEntry<"blog">[]>>) {
  const localisedPosts = Object.values(posts)
    .map((groupedPosts) => {
      if (!groupedPosts) return null;

      return (
        groupedPosts.find((post) => post.id.startsWith(`${locale}/`)) ??
        groupedPosts.find((post) =>
          post.id.startsWith(`${siteConfig.defaultLocale}/`)
        )
      );
    })
    .filter((post): post is CollectionEntry<"blog"> => post !== undefined)
    .filter(Boolean);

  return localisedPosts;
}

export function mapBlogPosts(posts: Array<CollectionEntry<'blog'>>) {
  return posts.map((post: CollectionEntry<'blog'>) => {
    const d = new Date(post.data.date);
    const year = d.getFullYear().toString();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');

    return {
      params: {
        year,
        month,
        day,
        id: post.id,
      },
      props: { post },
    };
  });
}

export function getPostLocale(id: string) {
  return id.split("/")[0];
}

export function getPostSlug(id: string) {
  return id.split("/").slice(1).join("/");
}