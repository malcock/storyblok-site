# Martin Alcock: personal site

Nuxt site rendering content from the **storyblok-site** Storyblok space (EU region). Built on Storyblok's Nuxt blueprint.

## Local development and the Visual Editor

```sh
npm install
npm run dev   # https://localhost:3000, reads draft content
```

`.env` (gitignored):

```sh
STORYBLOK_DELIVERY_API_TOKEN=<the space's Preview token>
STORYBLOK_REGION=eu
```

In Storyblok, **Settings → Visual Editor → Location** is `https://localhost:3000/`. Open any story to edit it in place.

## How content maps to code

- Each Storyblok block has a component in `app/storyblok/`, named after the block (`track_section` → `TrackSection.vue`). `app/plugins/storyblok-block-names.ts` registers each one under its exact block name.
- `app/pages/[...slug].vue` fetches a story by URL and resolves case study references on `track_section` and `role`.
- Content version: drafts in `nuxt dev`, published in builds. Override with `NUXT_PUBLIC_STORYBLOK_VERSION=draft|published`.

## Production: Cloudflare Pages

`npm run generate` writes flat HTML to `.output/public`, crawling from the home page. The build fails if the home story isn't published, so an empty site never goes live.

Cloudflare Pages builds from `main` on every push:

| Setting | Value |
|-|-|
| Build command | `npm run generate` |
| Output directory | `.output/public` |
| Node version | from `.node-version` |
| `STORYBLOK_DELIVERY_API_TOKEN` | the space's **Public** token (published content only) |
| `STORYBLOK_REGION` | `eu` |

Publishing in Storyblok triggers a rebuild through a Pages deploy hook, set as a Storyblok webhook.
