import { defineCollection, z } from "astro:content";

// We're just going to have one collection for now, a blog
const blog = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.date(),
      updatedDate: z.date().optional(),
      cover: image(),
      tags: z.array(z.string()).optional(),
      htbMachineActive: z.boolean().optional(),
    }),
});

export const collections = { blog };
