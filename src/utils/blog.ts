import { siteConfig } from '@config/site';
import type { Lang } from "@i18n/ui";
import { getCollection, type CollectionEntry, type DataEntryMap } from 'astro:content';

export async function getBlogPosts({ locale, sort }: { locale?: string; sort?: boolean } = {}) {

  console.log(`Running getBlogPosts for ${locale}`);

  const allPosts = await getCollection('blog');

  return allPosts;

  // const postsMap = new Map();

  // for (const post of defaultPosts) {
  //   postsMap.set(post.id, post);
  // }

  // if (locale) {
  //   const localePosts = await getCollection(blogCollectionLocales[locale]);

  //   for (const post of localePosts) {
  //     postsMap.set(post.id, post);
  //   }
  // }

  // const posts = Array.from(postsMap.values());

  // if (sort) {
  //   posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  // }

  // return posts;
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