# fuka.dev

Micah Fukazawa's homepage, built with [Astro](https://astro.build) and deployed to Netlify.

## Commands

| Command        | Action                                   |
| :------------- | :--------------------------------------- |
| `pnpm install` | Install dependencies                     |
| `pnpm dev`     | Start the dev server at `localhost:4321` |
| `pnpm build`   | Build the static site to `./dist/`       |
| `pnpm preview` | Preview the build locally                |
| `pnpm check`   | Type-check `.astro` and `.ts` files      |

## Project structure

```
src/
  components/        Header, Footer, PostList
  content/blog/en/   English Markdown posts
  content/blog/ja/   Japanese Markdown posts (same filename = translation)
  content.config.ts  Blog collection schema
  data/site.ts       Site title, nav links, social links
  i18n/ui.ts         Locales, UI strings, path helpers
  layouts/Base.astro
  lib/blog.ts        getPosts() and formatDate()
  pages/[...lang]/   index, about, blog/, rss.xml for every locale
  pages/404.astro
  styles/global.css  Tailwind entry point and @theme tokens
```

To add a post, create a `.md` file in `src/content/blog/<lang>/` with `title`, `description` and `pubDate` frontmatter.

## i18n

English is served at `/` and Japanese at `/ja/` (Astro i18n routing, `prefixDefaultLocale: false`). Each page under `pages/[...lang]/` is generated once per locale. UI strings live in `src/i18n/ui.ts`. A post's translation is the file with the same name in the other language's folder; if it doesn't exist, the language switcher links to that language's blog index.

## Migration from Gridsome

This replaces the old [MFukazawa/hp](https://github.com/MFukazawa/hp) site.

|                 | Before                          | After                             |
| :-------------- | :------------------------------ | :-------------------------------- |
| Framework       | Gridsome 0.7 (Vue 2)            | Astro 7                           |
| Styling         | Tailwind v1 (PostCSS plugin)    | Tailwind v4 (`@tailwindcss/vite`) |
| Content         | Contentful via GraphQL (unused) | Markdown content collection       |
| Package manager | npm                             | pnpm                              |
| Node            | unpinned                        | 22                                |

### Architecture decisions

- **Static output, no adapter.** Netlify serves `dist/`.
- **No UI framework and no client-side JavaScript.** Pages are plain `.astro` components.
- **No CMS.** Posts are Markdown files in the repo, so the site needs no environment variables.
- **Blank-slate styling.** `global.css` only imports Tailwind; the design will be built up from here.

## Deployment

Netlify reads `netlify.toml`: `pnpm build`, publish `dist`, Node 22.
