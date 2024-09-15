import { component$ } from "@builder.io/qwik";
import { Button } from "@/components/ui/Button";
import { RecipeCard } from "@/components/RecipeCard";

interface Recipe {
  id: number;
  name: string;
  quantity: number;
}

interface RecipeScratchpadProps {
  recipes: Recipe[];
  addRecipe: (name: string, quantity: number) => void;
  removeRecipe: (id: number) => void;
  updateRecipeQuantity: (id: number, quantity: number) => void;
}

export const RecipeScratchpad = component$<RecipeScratchpadProps>((props) => {
  const { recipes, addRecipe, removeRecipe, updateRecipeQuantity } = props;

  return (
    <div id="recipeScratchpad" class="card">
      <h2>Recipe Scratchpad</h2>
      <div class="input-group">
        <input id="newRecipe" type="text" placeholder="Add a new recipe" />
        <input id="newQuantity" type="number" min="1" value="1" />
        <Button
          onClick$={() => {
            const newRecipe = (
              document.getElementById("newRecipe") as HTMLInputElement
            ).value.trim();
            const newQuantity =
              parseInt(
                (document.getElementById("newQuantity") as HTMLInputElement)
                  .value
              ) || 1;
            if (newRecipe) {
              addRecipe(newRecipe, newQuantity);
              (document.getElementById("newRecipe") as HTMLInputElement).value =
                "";
              (
                document.getElementById("newQuantity") as HTMLInputElement
              ).value = "1";
            }
          }}
          variant="default"
          size="sm"
        >
          Add
        </Button>
      </div>
      <div id="recipeList" class="recipe-grid">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            removeRecipe={removeRecipe}
            updateRecipeQuantity={updateRecipeQuantity}
          />
        ))}
      </div>
    </div>
  );
});
