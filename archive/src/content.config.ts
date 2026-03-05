import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// English articles (root level only, exclude fr/ subdirectory)
const articles = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    featuredItems: z.array(z.string()).default([]),
  }),
});

// French articles
const articlesFr = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles/fr' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    featuredItems: z.array(z.string()).default([]),
  }),
});

const books = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/books' }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    publisher: z.string(),
    year: z.number(),
    isbn: z.string(),
    pages: z.number().optional(),
    description: z.string(),
    cover: z.string(),
    coverBack: z.string().optional(),
    category: z.enum(['jewelry', 'coins', 'rings', 'reference', 'exhibition']),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { articles, articlesFr, books };
