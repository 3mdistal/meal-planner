import { defineCollection, z } from "astro:content";

const schemaPath =
  "/Users/monkey/Downloads/Coding Projects/teenylilapps/apps/mini/meal-planner/.astro/collections/";

const recipeCollection = defineCollection({
  type: "data",
  schema: z.object({
    $schema: z.literal(`${schemaPath}recipes.schema.json`),
    name: z.string(),
    type: z.enum(["breakfast", "dinner", "side", "snack", "dessert", "fruit"]),
  }),
});

export const collections = {
  recipes: recipeCollection,
};
