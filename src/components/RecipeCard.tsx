import { component$ } from "@builder.io/qwik";
import { Button } from "@/components/ui/Button";

interface Recipe {
  id: number;
  name: string;
  quantity: number;
}

interface RecipeCardProps {
  recipe: Recipe;
  removeRecipe: (id: number) => void;
  updateRecipeQuantity: (id: number, quantity: number) => void;
}

export const RecipeCard = component$<RecipeCardProps>((props) => {
  const { recipe, removeRecipe, updateRecipeQuantity } = props;

  return (
    <div key={recipe.id} class="recipe-card">
      <h3>{recipe.name}</h3>
      <div class="recipe-details">
        <span>Available: {recipe.quantity}</span>
        <input
          type="number"
          min="0"
          value={recipe.quantity}
          class="quantity-input"
          onChange$={(e) =>
            updateRecipeQuantity(
              recipe.id,
              parseInt((e.target as HTMLInputElement).value) || 0
            )
          }
        />
      </div>
      <Button
        variant="secondary"
        onClick$={() => removeRecipe(recipe.id)}
        size="sm"
      >
        Remove
      </Button>
    </div>
  );
});
