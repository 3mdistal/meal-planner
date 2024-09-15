import { component$, useStore, useVisibleTask$, $ } from "@builder.io/qwik";
import { Button } from "@/components/ui/Button";
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

interface Day {
  meals: (Meal | null)[];
}

export const MealPlanner = component$(() => {
  const state = useStore<{ mealPlan: Day[]; recipes: Recipe[] }>({
    mealPlan: [],
    recipes: [],
  });

  useVisibleTask$(() => {
    const storedMealPlan = localStorage.getItem("mealPlan");
    const storedRecipes = localStorage.getItem("recipes");
    state.mealPlan = storedMealPlan
      ? JSON.parse(storedMealPlan)
      : Array.from({ length: 7 }, () => ({ meals: [null, null, null] }));
    state.recipes = storedRecipes ? JSON.parse(storedRecipes) : [];
  });

  const saveMealPlan = $(() => {
    localStorage.setItem("mealPlan", JSON.stringify(state.mealPlan));
  });

  const saveRecipes = $(() => {
    localStorage.setItem("recipes", JSON.stringify(state.recipes));
  });

  const addRecipe = $((newRecipe: string, newQuantity: number) => {
    state.recipes.push({
      id: Date.now(),
      name: newRecipe,
      quantity: newQuantity,
    });
    saveRecipes();
  });

  const removeRecipe = $((id: number) => {
    state.recipes = state.recipes.filter((recipe) => recipe.id !== id);
    state.mealPlan = state.mealPlan.map((day) => ({
      ...day,
      meals: day.meals.map((meal) =>
        meal && meal.recipeId === id ? null : meal
      ),
    }));
    saveRecipes();
    saveMealPlan();
  });

  const updateRecipeQuantity = $((id: number, quantity: number) => {
    if (quantity < 0) return;
    state.recipes = state.recipes.map((recipe) =>
      recipe.id === id ? { ...recipe, quantity: Math.max(0, quantity) } : recipe
    );
    saveRecipes();
  });

  const updateMeal = $(
    (dayIndex: number, mealIndex: number, recipeId: number) => {
      if (
        state.mealPlan[dayIndex] &&
        state.mealPlan[dayIndex].meals[mealIndex] !== undefined
      ) {
        state.mealPlan[dayIndex].meals[mealIndex] = recipeId
          ? { recipeId, quantity: 1 }
          : null;
        saveMealPlan();
      }
    }
  );

  const updateMealQuantity = $(
    (dayIndex: number, mealIndex: number, quantity: number) => {
      if (quantity < 1) return;
      const meal = state.mealPlan[dayIndex]?.meals[mealIndex];
      if (meal) {
        meal.quantity = quantity;
        saveMealPlan();
      }
    }
  );

  const addDay = $(() => {
    state.mealPlan.push({ meals: [null, null, null] });
    saveMealPlan();
  });

  const removeDay = $((dayIndex: number) => {
    if (state.mealPlan.length > 1) {
      state.mealPlan = state.mealPlan.filter((_, index) => index !== dayIndex);
      saveMealPlan();
    }
  });

  const addMeal = $((dayIndex: number) => {
    if (state.mealPlan[dayIndex]) {
      state.mealPlan[dayIndex].meals.push(null);
      saveMealPlan();
    }
  });

  const removeMeal = $((dayIndex: number) => {
    if (state.mealPlan[dayIndex] && state.mealPlan[dayIndex].meals.length > 1) {
      state.mealPlan[dayIndex].meals.pop();
      saveMealPlan();
    }
  });

  const viewMealPlan = $(() => {
    const mealPlanText = state.mealPlan
      .map((day, dayIndex) => {
        const meals = day.meals
          .map((meal, index) => {
            if (!meal) return `    Meal ${index + 1}: Not selected`;
            const recipe = state.recipes.find((r) => r.id === meal.recipeId);
            return `    Meal ${index + 1}: ${
              recipe ? recipe.name : "Unknown"
            } (Quantity: ${meal.quantity})`;
          })
          .join("\n");
        return `Day ${dayIndex + 1}:\n${meals}`;
      })
      .join("\n\n");
    alert(mealPlanText);
  });

  return (
    <div class="container">
      <div class="header">
        <h1>Meal Planner</h1>
        <div class="button-group">
          <Button onClick$={addDay} variant="default" size="sm">
            Add Day
          </Button>
          <Button onClick$={viewMealPlan} variant="secondary" size="sm">
            View Meal Plan
          </Button>
        </div>
      </div>
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
                (
                  document.getElementById("newRecipe") as HTMLInputElement
                ).value = "";
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
          {state.recipes.map((recipe) => (
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
          ))}
        </div>
      </div>
      <div id="mealPlan" class="meal-plan-grid">
        {state.mealPlan.map((day, dayIndex) => (
          <div key={dayIndex} class="day-card">
            <h2>Day {dayIndex + 1}</h2>
            <div class="button-group">
              <Button
                variant="default"
                size="sm"
                onClick$={() => addMeal(dayIndex)}
              >
                Add Meal
              </Button>
              <Button
                variant="secondary"
                onClick$={() => removeMeal(dayIndex)}
                size="sm"
              >
                Remove Meal
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick$={() => removeDay(dayIndex)}
              >
                Remove Day
              </Button>
            </div>
            {day.meals.map((meal, mealIndex) => (
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
                  {state.recipes.map((recipe) => (
                    <SelectOption
                      key={recipe.id}
                      value={recipe.id}
                      label={recipe.name}
                    />
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
            ))}
          </div>
        ))}
      </div>
    </div>
  );
});
