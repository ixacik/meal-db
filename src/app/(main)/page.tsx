import MealCard from "./_components/meal-card";
import RecipeSearch from "./_components/recipe-search";
import { db } from "@/db";
import { recipes } from "@/db/schema";
import Uploadzone from "./_components/uploadzone";

export default async function Home({
  searchParams,
}: {
  searchParams: { q: string | undefined };
}) {
  // TODO: Implement search params
  const items = await db.select().from(recipes);

  return (
    <>
      <RecipeSearch className="mb-4" />
      <Uploadzone />
      <div className="grid grid-cols-2 gap-4">
        {items.map((recipe) => (
          <MealCard key={recipe.id} item={recipe} />
        ))}
      </div>
    </>
  );
}
