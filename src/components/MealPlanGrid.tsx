import { component$ } from "@builder.io/qwik";
import { DayCard } from "@/components/DayCard";

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

interface MealPlanGridProps {
  mealPlan: Day[];
  recipes: Recipe[];
  addMeal: (dayIndex: number) => void;
  removeMeal: (dayIndex: number) => void;
  removeDay: (dayIndex: number) => void;
  updateMeal: (dayIndex: number, mealIndex: number, recipeId: number) => void;
  updateMealQuantity: (
    dayIndex: number,
    mealIndex: number,
    quantity: number
  ) => void;
}

export const MealPlanGrid = component$<MealPlanGridProps>((props) => {
  const {
    mealPlan,
    recipes,
    addMeal,
    removeMeal,
    removeDay,
    updateMeal,
    updateMealQuantity,
  } = props;

  return (
    <div id="mealPlan" class="meal-plan-grid">
      {mealPlan.map((day, dayIndex) => (
        <DayCard
          key={dayIndex}
          day={day}
          dayIndex={dayIndex}
          recipes={recipes}
          addMeal={addMeal}
          removeMeal={removeMeal}
          removeDay={removeDay}
          updateMeal={updateMeal}
          updateMealQuantity={updateMealQuantity}
        />
      ))}
    </div>
  );
});
