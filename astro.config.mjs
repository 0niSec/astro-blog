import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

import expressiveCode from "astro-expressive-code";
import { remarkModifiedTime } from "./remark-modified-time.mjs";
import remarkToc from "remark-toc";

// https://astro.build/config
export default defineConfig({
  site: "https://0nisec.blog",
  prefetch: {
    defaultStrategy: "hover",
  },
  markdown: {
    remarkPlugins: [
      [remarkToc, { heading: "Table of Contents", maxDepth: 3 }],
      remarkModifiedTime,
    ],
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
