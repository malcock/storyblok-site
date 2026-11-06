import mkcert from "vite-plugin-mkcert";

export default defineNuxtConfig({
  compatibilityDate: "2026-01-13",
  devtools: { enabled: false },
  modules: ["@storyblok/nuxt"],

  storyblok: {
    accessToken: process.env.STORYBLOK_DELIVERY_API_TOKEN,
    apiOptions: {
      /** Set the correct region for your space. Learn more: https://www.storyblok.com/docs/packages/storyblok-js#example-region-parameter */
      region: process.env.STORYBLOK_REGION || "eu",
      /** The following code is only required when creating a Storyblok space directly via the Blueprints feature. */
      endpoint: process.env.STORYBLOK_API_BASE_URL
        ? `${new URL(process.env.STORYBLOK_API_BASE_URL).origin}/v2`
        : undefined,
    },
  },

  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://a.storyblok.com/f/212319/x/e6ccda03b8/blueprint-blank.css",
        },
      ],
    },
  },

  ssr: true,

  runtimeConfig: {
    public: {
      /**
       * Which Storyblok content to read. Empty means: drafts in `nuxt dev`,
       * published content in builds. Override with NUXT_PUBLIC_STORYBLOK_VERSION.
       */
      storyblokVersion: "",
    },
  },

  /** `nuxt generate` crawls from the home page and writes flat HTML. */
  nitro: {
    // Pin the preset: on Cloudflare's build image Nitro would otherwise
    // auto-detect cloudflare-pages and write to `dist` instead.
    preset: "static",
    prerender: {
      crawlLinks: true,
      routes: ["/"],
    },
  },

  devServer: {
    https: true,
  },

  vite: {
    plugins: [mkcert()],
  },
});
