import { component$ } from "@builder.io/qwik";
import { SelectOption } from "@/components/ui/SelectOption";

interface Recipe {
  id: number;
  name: string;
  quantity: number;
}

interface Meal {
  recipeId: number;
  quantity: number;
}

interface MealItemProps {
  meal: Meal | null;
  dayIndex: number;
  mealIndex: number;
  recipes: Recipe[];
  updateMeal: (dayIndex: number, mealIndex: number, recipeId: number) => void;
  updateMealQuantity: (
    dayIndex: number,
    mealIndex: number,
    quantity: number
  ) => void;
}

export const MealItem = component$<MealItemProps>((props) => {
  const { meal, dayIndex, mealIndex, recipes, updateMeal, updateMealQuantity } =
    props;

  return (
    <div key={mealIndex} class="meal-item">
      <select
        class="meal-select"
        value={meal ? meal.recipeId : ""}
        onChange$={(e) =>
          updateMeal(
            dayIndex,
            mealIndex,
            parseInt((e.target as HTMLSelectElement).value)
          )
        }
      >
        <SelectOption value="" label="Select a recipe" />
        {recipes.map((recipe) => (
          <SelectOption key={recipe.id} value={recipe.id} label={recipe.name} />
        ))}
      </select>
      {meal && (
        <input
          type="number"
          min="1"
          value={meal.quantity}
          class="quantity-input"
          onChange$={(e) =>
            updateMealQuantity(
              dayIndex,
              mealIndex,
              parseInt((e.target as HTMLInputElement).value) || 1
            )
          }
        />
      )}
    </div>
  );
});
