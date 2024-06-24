import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

import expressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
  site: "https://0nisec.blog",
  prefetch: {
    defaultStrategy: "hover",
  },
  integrations: [
    expressiveCode({
      themes: ["min-dark"],
    }),
    mdx(),
    sitemap(),
    tailwind(),
  ],
});
