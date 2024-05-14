"use client";

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { getIngredientsByName } from "../../_actions/ingredients";
import Image from "next/image";
import { Loader2, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCreateForm } from "../../_providers/form-provider";
import { Ingredient } from "@/db/schema";

export default function IngredientSearch() {
  const [search, setSearch] = useState<string>("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { fieldArray } = useCreateForm();

  useEffect(() => {
    async function fetchIngredients(query: string) {
      try {
        setLoading(true);
        const ingredients = await getIngredientsByName(query);
        setIngredients(ingredients);
        if (loading) setLoading(false);
      } catch (error) {
        return <div>Unable to fetch ingredients...</div>;
      }
    }
    fetchIngredients(search);
  }, [search, setIngredients]);

  return (
    <div className="flex flex-col items-center gap-2 px-4 h-[420px]">
      <div className="overflow-hidden flex items-center w-full rounded-lg">
        <Search className="size-[1em] text-accent" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for an ingredient"
          className="rounded-b-none h-14 border-b-0 border-none"
        />
      </div>

      {loading ? (
        <div className="w-full flex justify-center items-center h-full">
          <Loader2 className="size-8 animate-spin" />
        </div>
      ) : (
        <div className="flex flex-col gap-2 w-full">
          {ingredients.map((ingredient) => (
            <div
              key={ingredient.id}
              className="flex justify-between items-center gap-2 cursor-pointer hover:scale-[101%] transition-all duration-300 ease-in-out w-full py-2 pb-4 border-b"
              onClick={() => {
                if (!fieldArray.fields.some((i) => i.dbId === ingredient.id)) {
                  fieldArray.append({
                    dbId: ingredient.id,
                    name: ingredient.name,
                    amount: undefined,
                    image: ingredient.image || "/placeholder.svg",
                  });
                }
              }}
            >
              <div className="flex gap-2 items-center">
                <div className="relative size-[2em]">
                  <Image
                    src={ingredient.image || "/placeholder.svg"}
                    alt={ingredient.name}
                    fill
                  />
                </div>
                <p>{ingredient.name}</p>
              </div>
              <Button size="icon" variant="secondary">
                <Plus className="size-4" />
              </Button>
            </div>
          ))}
          {ingredients.length < 5 && (
            <div className="flex justify-center text-primary border-dashed border border-primary rounded-lg items-center w-full px-4 py-2 gap-4 hover:bg-primary/25 cursor-pointer">
              <Plus className="size-4" />
              <p className="text-sm">Add new ingredient</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
