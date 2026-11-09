# How AI built this site

I built this with Claude Code (Opus 5.5) in a single session. The Storyblok MCP server, the Storyblok CLI and Storyblok's agent skills were all connected. Every prompt below is copied verbatim from the session log.

The short version: the two prompts that mattered were about **structure**, not code. Everything after that was fairly mechanical.

---

## 1. Make it think about information architecture first

> I want to rebuild my personal site and I'm using it as an excuse to try out Storyblok. Let's pretend I've never used it before. Have a look at the stuff in my CV folder and come back with a few options for how the site could be structured, and what content goes where.
>
> It's mainly there to help me get hired, so it should show how I think: understanding the problem, then getting to a solution, rather than look-how-pretty-it-is. The CV bit shouldn't be a "download PDF" thing. It's more a work history, with the projects doing the heavy lifting. Probably all on one page, with case studies getting their own pages.
>
> I won't have many images due to NDAs etc, so it needs to work mostly without them. Give me options rather than just picking one.

**Why it worked:** it stops the agent going straight to "make a page, paste the CV in". Asking for *options* made it reason about structure and explain the trade-offs. It came back with three layouts and two shapes for case studies, plus a set of image-free blocks (`reframe`, `stat`, `decision`, `sequence`…). It also made the key modelling call explicit: should projects be blocks nested in the home page, or stories of their own that other parts of the site reference? We went with stories plus references, so one project summary shows up wherever it's needed.

Stating the constraints (the purpose is getting hired, there are hardly any images, I want a work history and not a PDF) did as much work as the request itself.

## 2. Turn that structure into a real content model and content (the MCP prompt)

> Great, let's go with that. You've got access to my Storyblok space through the MCP and CLI. In the space 'storyblok-site', can you set up whatever Storyblok needs for that structure, then put the real content from my CV folder in? I want the case studies to have proper structure inside them, not just one big wall of text, so I can rearrange the pieces later. Don't publish anything yet. When you're done, walk me through what you made, because I don't know Storyblok's terms yet.

**What it produced, all through the MCP server:**

- A `tags` datasource with 10 entries.
- A `project` content type with tabs for the summary, the case-study header and the case-study body.
- 21 nestable blocks.
- The starter `page` type restricted to the new home-page sections.
- A `work/` folder with 15 project stories, 5 of them full case studies.
- The Home story rebuilt from the starter "Hello world".

**Why it worked:**

- "Proper structure inside them … so I can rearrange the pieces later" is what turned the case studies into composable blocks instead of one rich-text field.
- "Don't publish anything yet" kept it safe to iterate.
- "Walk me through what you made" got me an explanation of Storyblok's terms mapped onto my own content, which taught me more than the docs did.

It also wrote a plan out before the first write, and asked one question I hadn't thought about: should the schema live in the Storyblok space, or as code in the repo?

## 3. Hand the design to a background agent

> Right, let's make it look like something. I want Constructivism as the main reference, but pared back. Not full-on communist poster, more minimalist. Think strong type, a limited palette, a bit of geometry and diagonals doing the work that photos normally would. Remember there are hardly any images. Keep it readable. It's a portfolio for someone who designs things, so it needs to feel considered rather than loud. Do this in a worktree, using a sub agent. Create the PR once done and let me know

**Why it worked:** the design work ran in its own git worktree as a background agent, which took about 12 minutes. Meanwhile I carried on writing this documentation. The main agent wrote the sub-agent's brief, including hard constraints:

- Don't touch the Storyblok schema.
- Keep `v-editable` on every block.
- Meet AA contrast.
- No horizontal scroll at 360px.

The sub-agent then built the static site, screenshotted it at desktop and mobile widths, iterated, and opened [PR #1](https://github.com/malcock/storyblok-site/pull/1) for me to review, not merge.

---

## The mechanical ones

Worth recording, not worth a fuss.

> yep build the frontend using Nuxt so I can see it in the visual editor. Keep the styling plain for now, I just want to see the content coming through

This scaffolded Storyblok's official Nuxt blueprint, wrote one component per block and set up `resolve_relations` so the story references arrive as full stories rather than IDs.

> Let's get this online. I want it on Cloudflare Pages, built automatically from GitHub whenever I push, and I want it to be flat HTML rather than something running on a server. Wrangler's logged into my account, so check it's the right one first. Set up what you can and tell me what I need to do myself.

This switched the build to static generation and pushed to GitHub. It also wrote me a checklist of the dashboard steps the tools can't do.

---

## What I checked or changed, and why

I treated everything the AI produced as a draft.

- **Copy that went further than the facts.** The agent wrote the site copy from my career notes in my own voice, then re-checked it against the source and corrected four lines where it had embellished:
  - a sofa that never existed;
  - a claim that users "didn't want to interrogate a chatbot", which I never said;
  - "safety-critical" for Forgemasters;
  - a job title for Platinum Stairlifts that the source doesn't support.

  Caveats from my notes, such as "I attribute the 50% uplift to this screen, it wasn't a controlled test", were kept on purpose. The `stat` block has a **required** caveat field so a number can't go up without one.
- **Deleting the starter blocks:** declined for now. The agent flagged deleting `teaser`, `grid` and `feature` as destructive and left them, which I agreed with.
- **Deployment:** done as a Git-connected Pages project in the dashboard rather than `wrangler pages project create`. A project created that way can never be connected to GitHub later.
