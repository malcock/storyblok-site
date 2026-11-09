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

  runtimeConfig: {
    public: {
      // Drafts while developing (Visual Editor), published content in the built site.
      // Override with STORYBLOK_VERSION=draft|published.
      storyblokVersion: process.env.STORYBLOK_VERSION || "published",
    },
  },

  css: ["~/assets/css/main.css"],

  app: {
    head: {
      htmlAttrs: { lang: "en-GB" },
      meta: [{ name: "theme-color", content: "#f3eee4" }],
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        {
          rel: "stylesheet",
          // Archivo (variable width + weight) for display, Source Serif 4 for reading.
          href: "https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..100,700..800&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&display=swap",
        },
      ],
    },
  },

  ssr: true,

  // Flat HTML: `npm run generate` prerenders every page reachable from "/" into .output/public.
  nitro: {
    preset: "static",
    prerender: {
      crawlLinks: true,
      routes: ["/"],
      failOnError: true,
    },
  },

  // Local HTTPS is only for the Visual Editor in dev; keep it out of CI builds.
  $development: {
    runtimeConfig: {
      public: { storyblokVersion: process.env.STORYBLOK_VERSION || "draft" },
    },
    devServer: {
      https: true,
    },
    vite: {
      plugins: [mkcert()],
    },
  },
});
