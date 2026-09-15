## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Writing posts

Create a Markdown/MDX file in `src/content/posts/`, e.g. `my-post.mdx`:

```mdx
---
title: 标题
description: 摘要
pubDate: 2026-09-15
tags: [标签]
---

正文……
```

The `pubDate` and `title`/`description` are required. The file name becomes the URL slug: `/blog/my-post/`.

## Deploy

Static site hosted on the Aliyun VPS behind an nginx Docker container
(`/srv/blog-nginx`, serving `/srv/blog` on port 80).

```bash
npm run deploy   # build + upload dist/ to the VPS over SSH (host alias: aliyun)
```

The VPS host is configured in `~/.ssh/config` as `aliyun`. Publish a new post:
write the `.mdx`, then `npm run deploy`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
