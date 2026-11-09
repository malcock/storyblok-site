# Martin Alcock: personal site (Nuxt + Storyblok)

My portfolio and work history, built as a test of one question: *how fast can you get something real working with Storyblok, and does it play nicely with AI tools?*

I built it end to end with Claude Code connected to Storyblok's MCP server, CLI and agent skills. The prompts that did the work are in [AI.md](AI.md).

**Full disclosure:** I'd essentially completed this task before my first interview stage with Sian, but it didn't feel right to submit something finished before I'd been asked for it. That earlier attempt is at [github.com/malcock/personal-site](https://github.com/malcock/personal-site) ([martinalcock.pages.dev](https://martinalcock.pages.dev)). This repo is a fresh run, done the "proper" way with the CLI and the new agent skills, so I could compare the two.

---

## What's in it

- **Home** (`page`) is a stack of sections you can reorder in the Visual Editor: hero, principles, featured work, work history, elsewhere, contact.
- **Projects** (`project`, in `work/`) are stories of their own. Home *references* them from three places (principles, featured work and each role in the work history), so every summary is written once.
- **Case studies** are a project's `body`: composable blocks like `reframe` (asked for vs the actual problem), `stat` (a number with a required caveat), `decision`, `sequence` and `observation`. There are hardly any images, because of NDAs, so the structure does the visual work. A project with an empty body is just a summary, with no page of its own.
- **Output** is flat HTML. `npm run generate` prerenders every page, ready for Cloudflare Pages.

---

## Run it locally

### Prerequisites

- Node 22+ (pinned in `.node-version`).
- A Storyblok space with the content model. Mine is `storyblok-site`, in the EU region.
- [mkcert](https://github.com/FiloSottile/mkcert), for HTTPS on localhost. The Visual Editor only loads previews over HTTPS. `vite-plugin-mkcert` handles the certificate in dev, but your machine has to trust it the first time.

To *rebuild* the content model with AI as I did, you also need:

- the [Storyblok MCP server](https://www.storyblok.com/docs) connected to your assistant;
- the Storyblok CLI (`npm i -g storyblok`), authenticated with a personal access token (`storyblok login`);
- the [Storyblok agent skills](https://github.com/storyblok/agent-plugin).

### Setup

```bash
npm install
cp .env.example .env
```

Fill in `.env`:

```bash
STORYBLOK_DELIVERY_API_TOKEN=<your Preview token, from Settings → Access Tokens>
STORYBLOK_REGION=eu
```

Locally, use the **Preview** token, because it can read drafts. Never use it for the deployed site (see below).

### Develop with the Visual Editor

```bash
npm run dev     # serves https://localhost:3000/
```

In Storyblok, go to **Settings → Visual Editor** and set the preview URL to `https://localhost:3000/`. **It must end with a trailing slash**, otherwise the preview breaks. Then open the Home story. Clicking any block opens its fields, and edits appear live.

Dev mode shows **draft** content. Builds show **published** content. You can override either with `STORYBLOK_VERSION=draft|published`.

### Build the static site

```bash
npm run generate                            # published content → .output/public
STORYBLOK_VERSION=draft npm run generate    # check drafts before publishing
npx serve .output/public                    # look at the result
```

The build fails if any page errors, including a missing Home story. A broken build never ships.

### Deploy (Cloudflare Pages)

Create the project in the Cloudflare dashboard with **Connect to Git**, not with `wrangler pages project create`. A project created by Wrangler is direct-upload only and can never be connected to GitHub later.

| Setting | Value |
|-|-|
| Production branch | `main` |
| Build command | `npm run generate` |
| Output directory | `.output/public` |
| `STORYBLOK_DELIVERY_API_TOKEN` | your **Public** token |
| `STORYBLOK_REGION` | `eu` |

The token is baked into the generated HTML. That's why production must use the **Public** token, which can only read published content.

To rebuild whenever you publish:

1. In the Pages project, create a deploy hook under **Settings → Builds → Deploy hooks**.
2. Add the hook's URL as a Storyblok webhook under **Settings → Webhooks**, triggered on "Story published" and "Story unpublished".

---

## Findings

**The real lesson is about structure, not tooling.** To get the most out of Storyblok, you (or your agent!) should think about information architecture before adding any content. My most useful prompt asked for *options* for structuring the site before anything was created. Without that, an agent will happily pour content into basic pages and you lose most of what makes Storyblok worth having: reusable blocks, references and editors rearranging pieces in the Visual Editor.

**MCP plus agent skills is genuinely quick.** Going from my CV notes to a 22-component model with 16 stories of real content took about 10 minutes, all through the MCP server. The skills made a visible difference:
- The agent wrote a plan before writing anything.
- It refused to delete anything without asking.
- It projected its API calls to stay small.
- It knew that `updateStory` and `updateComponent` are full replacements, so it always read the current version first.

My first attempt used neither the CLI nor the skills and still got there with few problems. It was just less careful.

**What tripped me up:**

- **New spaces and the MCP connector.** If you've already authorised the Storyblok MCP connector and then create a new space, the connector won't have access to it. I had to disconnect and reconnect it.
- **Block names vs Vue component names.** Storyblok names blocks in `snake_case` (`text_section`). The Nuxt SDK looks for the raw name first, logs `Component could not be found for blok "text_section"`, and *then* falls back to `TextSection.vue`. The page renders fine, but the logs are full of errors that look fatal.
  - In my first attempt this was the biggest source of confusion.
  - This time the agent skills got the file naming right first time, but the noisy errors were still there.
  - Registering snake_case aliases in `app/plugins/storyblok-aliases.js` silenced them.
- **Things the MCP server can't do.** It can't set the Visual Editor preview URL, create webhooks or create component groups. All three are a minute's work in the UI, but expect a short manual checklist.
- **The preview URL needs a trailing slash.** `https://localhost:3000/`, not `https://localhost:3000`.
- **Static HTML and the Visual Editor.** Deploying flat HTML means the live site can't power the Visual Editor: it only has published content and no server. Locally that's fine (`npm run dev`). For editors who aren't developers, the fix is a separate preview deployment built with `STORYBLOK_VERSION=draft` and the Preview token. That deployment must sit behind access control (e.g. Cloudflare Access), because the token ends up in the HTML.

### Other pitfalls, from the session log

- **`storyblok create` refuses a non-empty folder**, even one that only has `.git` in it. I scaffolded into a sibling folder and moved the files across.
- **The starter space isn't empty.** It ships with `page`, `teaser`, `grid`, `feature` and a "Hello world" Home story. The agent restricted `page` to the new blocks and replaced Home's content. It didn't delete the starter blocks, because deletion is destructive and needs explicit sign-off.
- **The Nuxt blueprint has dev-only settings baked in.** It hardcodes `version: 'draft'` and turns on HTTPS/mkcert for every build, which can break a CI build. Both are now dev-only.
- **Story references come back as UUIDs.** You need `resolve_relations` on the API call *and* `resolveRelations` on the bridge. Otherwise references vanish as soon as you edit in the Visual Editor.
- **Unpublished references disappear quietly.** If Home is published but a project it references isn't, that project's card simply doesn't render. Publish the projects too.
- **Wrangler said it wasn't logged in** even though a saved login existed, so the agent couldn't confirm which Cloudflare account it was on. The Git-connected Pages setup doesn't need Wrangler anyway.
- **AI copy needs checking against the source.** The agent embellished four details in the case studies and corrected them on review (see [AI.md](AI.md)).

---

## How long it took

Times are taken from the session log on 9 November 2026.

| Step | Time |
|-|-|
| IA options from my CV folder | 10:13 to 10:20 (7 min) |
| Content model and all content, via MCP | 10:20 to 10:30 (10 min) |
| Nuxt frontend with the Visual Editor working | 10:31 to 10:40 (9 min) |
| Static build, GitHub push, Cloudflare checklist | 10:41 to 10:52 (11 min) |
| Constructivist redesign, in a background agent | 10:52 to 11:04 (12 min, whilst I wrote docs) |
| My notes, then this README and AI.md | 11:04 to 11:15 (11 min) |
| **Total** | **about 1 hour** (10:13 to 11:15) |

That doesn't include the bits I did by hand in dashboards: access tokens, the preview URL, the Pages project and the webhook.

---

## Project layout

```
app/
  pages/[...slug].vue     fetches the story for any URL, resolves references
  storyblok/              one component per Storyblok block (auto-registered)
  components/             ProjectSummary: renders a referenced project
  plugins/                snake_case aliases for block names
  utils/linkHref.js       Storyblok link fields → hrefs
nuxt.config.ts            Storyblok module, static output, dev-only HTTPS
AI.md                     the prompts that built this
```
