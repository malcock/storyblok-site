# AGENTS.md

Martin Alcock's personal site. Nuxt 4 + `@storyblok/nuxt`, prerendered to flat HTML and deployed to Cloudflare Pages from `main`. Content lives in the Storyblok space `storyblok-site` (EU region). See [README.md](README.md) for setup and [AI.md](AI.md) for how it was built.

## Commands

- `npm run dev`: serves `https://localhost:3000/` with **draft** content. HTTPS is required by the Visual Editor (mkcert, dev only).
- `npm run generate`: static build into `.output/public` with **published** content. Fails on any page error, including a missing Home story.
- `STORYBLOK_VERSION=draft|published` overrides either default.
- Node 22+ (`.node-version`). No test suite or linter. Check changes by running `npm run generate` and looking at the output.

## How it fits together

- `app/pages/[...slug].vue` is the only page. It fetches the story for any URL (`/` is the `home` story) and renders it with `<StoryblokComponent>`.
- `app/storyblok/` has one Vue file per Storyblok block, auto-registered. `text_section` maps to `TextSection.vue`.
- Content types: `page` (Home), `project` (stories in `work/`) and `article` (stories in `writing/`).
- `app/components/ProjectSummary.vue` renders a referenced project. A project only gets its own page if its `body` has blocks (`hasCaseStudy` in `app/utils/linkHref.js`).
- Page titles and descriptions come from story fields, not hardcoded strings.

## Rules that will bite you

- **Adding a block:** create its Vue file in `app/storyblok/`. If the name has an underscore, also add a snake_case alias in `app/plugins/storyblok-aliases.js`, or the console fills with "Component could not be found" errors.
- **Every block root needs `v-editable="blok"`**, or it can't be clicked in the Visual Editor.
- **Adding a reference field:** add it to `relations` in `[...slug].vue`. That array is used for both `resolve_relations` (API) and `resolveRelations` (bridge). Miss it and references arrive as UUID strings and quietly don't render.
- **Unpublished references vanish** from the built site. Publish referenced projects along with the story that references them.
- **Static output only.** No server routes, no runtime API calls that need secrets. Every page must be reachable by links from `/`, because the prerender crawls from there.
- **Tokens:** the build uses the **Public** token, because it ends up in the HTML. The Preview token is for local `.env` only. Never commit `.env`.
- **Styling:** use the CSS custom properties in `app/assets/css/main.css` (`--color-*`, `--space-*`, `--rule-*`) rather than raw values. The design is pared-back Constructivism with hardly any images. Keep AA contrast and no horizontal scroll at 360px.

## Working with Storyblok through MCP or the CLI

- Load the Storyblok agent skills before touching the space: https://github.com/storyblok/agent-plugin
- `updateStory` and `updateComponent` replace the whole object. Read the current version first and send it back complete.
- Use `fields` to keep responses small.
- Don't publish, delete or unpublish anything without asking. The starter blocks (`teaser`, `grid`, `feature`) are left in on purpose.
- The MCP server can't set the Visual Editor preview URL, create webhooks or create component groups. Those are manual dashboard steps.
- `stat` blocks have a required caveat. Don't invent numbers or details. Check copy against the source content, because the agent has embellished before.

## Writing

Docs and site copy are in Martin's voice: British English, contractions, no em dashes, no LLM filler. Use the `writing-voice` skill if it's available.

## Docs

- Storyblok: https://www.storyblok.com/docs
- `@storyblok/nuxt`: https://www.storyblok.com/docs/packages/storyblok-nuxt
- Nuxt: https://nuxt.com/llms.txt
