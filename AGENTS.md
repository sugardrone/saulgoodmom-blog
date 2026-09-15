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

**Primary flow: push to `main` on GitHub triggers `.github/workflows/deploy.yml`,**
which builds and uploads `dist/` to the VPS using repo secrets
(`VPS_HOST` / `VPS_USER` / `VPS_SSH_KEY` / `KNOWN_HOSTS`).

```bash
npm run deploy   # manual fallback: build + upload dist/ to the VPS over SSH (host alias: aliyun)
```

The VPS host is configured in `~/.ssh/config` as `aliyun`.

## Admin backend (Decap CMS)

`https://suncar.live/admin/` hosts Decap CMS (files in `public/admin/`).
It logs in via GitHub OAuth and commits `.mdx` files to `main`, which then
auto-deploys through CI. The OAuth gateway runs as a Docker container
(`deploy/oauth-gateway/`, proxied at `https://suncar.live/oauth/`) with
credentials in `/srv/blog-nginx/oauth-gateway.env` on the VPS.
See `deploy/oauth-gateway/README.md` for operation details.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
