import rss from '@astrojs/rss';
import type { APIContext, GetStaticPaths } from 'astro';
import { SITE_TITLE } from '../../data/site';
import { getPosts, postSlug } from '../../lib/blog';
import { langPaths, localizePath, useTranslations, type Lang } from '../../i18n/ui';

export const getStaticPaths = (() => langPaths()) satisfies GetStaticPaths;

export async function GET(context: APIContext<{ lang: Lang }>) {
  const { lang } = context.props;
  const posts = await getPosts(lang);
  return rss({
    title: SITE_TITLE,
    description: useTranslations(lang)('site.description'),
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: localizePath(lang, `/blog/${postSlug(post)}/`),
    })),
  });
}
