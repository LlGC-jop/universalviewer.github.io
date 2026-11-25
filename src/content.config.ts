
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { defineCollection } from 'astro:content';

const blog = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/blog",
  }),
  schema: ({ image }) =>
    z.object({
      // slug: z.string(),
      // locale: z.enum([
      //   'en',
      //   'cy',
      //   'fr',
      //   'se',
      //   'pl',
      //   'de',
      // ]),
      title: z.string(),
      description: z.string().optional(),
      date: z.date(),
      author: z.string().optional(),
      thumb: image().optional(),
      thumbAlt: z.string().optional(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
    }),
});

// console.log(blog);

export const collections = {
  blog
}

/* const blog = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.date(),
      language: z.enum(['en']),
      author: z.string().optional(),
      description: z.string().optional(),
      thumb: image().optional(),
      thumbAlt: z.string().optional(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
    }),
});

const blogCy = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/blog/cy" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.date(),
      language: z.enum(['cy']),
      author: z.string().optional(),
      description: z.string().optional(),
      thumb: image().optional(),
      thumbAlt: z.string().optional(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
    }),
}); 

export const collections = {
  blog,
  blogCy,
};*/
