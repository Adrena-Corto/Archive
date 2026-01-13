import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const articles = await getCollection('articles', ({ data }) => !data.draft);

  return rss({
    title: 'The Archive - Articles',
    description: 'Articles about ancient coins, artifacts, and collecting',
    site: context.site || 'https://example.com',
    items: articles.map(article => ({
      title: article.data.title,
      description: article.data.description,
      pubDate: article.data.publishDate,
      link: `/library/articles/${article.id}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
