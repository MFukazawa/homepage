export const languages = {
  en: 'English',
  ja: '日本語',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'en';

export const langs = Object.keys(languages) as Lang[];

const ui = {
  en: {
    'site.description': "Micah Fukazawa's homepage",
    'nav.blog': 'Blog',
    'nav.about': 'About',
    'home.intro':
      'Engineering Manager at Soda, Inc. \n\n Former frontend engineer, now figuring out what engineering looks like in a post-AI world.',
    'home.latestPosts': 'Latest posts',
    'home.allPosts': 'All posts',
    'blog.title': 'Blog',
    'blog.updated': 'Updated',
    'about.title': 'About',
  },
  ja: {
    'site.description': '深澤マイカのホームページ',
    'nav.blog': 'ブログ',
    'nav.about': 'About',
    'home.intro':
      '株式会社Sodaのエンジニアリングマネージャー。\n\n 元フロントエンドエンジニア。AI以降の世界で、エンジニアリングがどう変わっていくのかを考えています。',
    'home.latestPosts': '最新の投稿',
    'home.allPosts': 'すべての投稿',
    'blog.title': 'ブログ',
    'blog.updated': '更新',
    'about.title': 'About',
  },
} as const satisfies Record<Lang, Record<string, string>>;

export type UIKey = keyof (typeof ui)['en'];

export const useTranslations = (lang: Lang) => (key: UIKey) => ui[lang][key];

/** `[...lang]` params for every locale; the default locale has no prefix. */
export const langPaths = () =>
  langs.map((lang) => ({
    params: { lang: lang === defaultLang ? undefined : lang },
    props: { lang },
  }));

/** Strip the locale prefix from a pathname: `/ja/blog/` → `/blog/`. */
export function stripLang(pathname: string) {
  const [, first, ...rest] = pathname.split('/');
  return langs.includes(first as Lang) ? `/${rest.join('/')}` : pathname;
}

/** Prefix a root-relative path with a locale: (`ja`, `/blog/`) → `/ja/blog/`. */
export const localizePath = (lang: Lang, path: string) =>
  lang === defaultLang ? path : `/${lang}${path}`;

/** Read the current locale from Astro, narrowed to a supported `Lang`. */
export const toLang = (locale: string | undefined): Lang =>
  langs.includes(locale as Lang) ? (locale as Lang) : defaultLang;
