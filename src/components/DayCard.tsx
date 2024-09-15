import { component$ } from "@builder.io/qwik";
import { Button } from "@/components/ui/Button";
import { MealItem } from "@/components/MealItem";

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

interface DayCardProps {
  day: Day;
  dayIndex: number;
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

export const DayCard = component$<DayCardProps>((props) => {
  const {
    day,
    dayIndex,
    recipes,
    addMeal,
    removeMeal,
    removeDay,
    updateMeal,
    updateMealQuantity,
  } = props;

  return (
    <div key={dayIndex} class="day-card">
      <h2>Day {dayIndex + 1}</h2>
      <div class="button-group">
        <Button variant="default" size="sm" onClick$={() => addMeal(dayIndex)}>
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
        <MealItem
          key={mealIndex}
          meal={meal}
          dayIndex={dayIndex}
          mealIndex={mealIndex}
          recipes={recipes}
          updateMeal={updateMeal}
          updateMealQuantity={updateMealQuantity}
        />
      ))}
    </div>
  );
});
