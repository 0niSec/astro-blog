import { defineCollection, z } from "astro:content";

// We're just going to have one collection for now, a blog
const blog = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).optional(),
    htbMachineActive: z.boolean().optional(),
  }),
});

export const collections = { blog };
