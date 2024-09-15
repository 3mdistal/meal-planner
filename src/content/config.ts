import { defineCollection, z } from "astro:content";

const schemaPath = "./.astro/collections/";

const recipes = defineCollection({
  type: "data",
  schema: z.object({
    $schema: z.literal(`${schemaPath}recipes.schema.json`),
    name: z.string(),
    type: z.enum(["breakfast", "dinner", "side", "snack", "dessert", "fruit"]),
  }),
});

export const collections = {
  recipes,
};
