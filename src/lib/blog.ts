import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';

const dateLocales: Record<Lang, string> = { en: 'en-US', ja: 'ja-JP' };

export const formatDate = (date: Date, lang: Lang) =>
  new Intl.DateTimeFormat(dateLocales[lang], {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);

/** Posts live in `src/content/blog/<lang>/<slug>.md`. */
export const postSlug = (post: CollectionEntry<'blog'>) => post.id.split('/').slice(1).join('/');

/** Blog posts in one language, newest first. */
export async function getPosts(lang: Lang) {
  const posts = await getCollection('blog', ({ id }) => id.startsWith(`${lang}/`));
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
