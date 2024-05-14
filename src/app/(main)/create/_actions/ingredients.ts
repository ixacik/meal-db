"use server";

import { db } from "@/db";
import { ingredients } from "@/db/schema";
import { eq, ilike } from "drizzle-orm";

export async function getIngredientsByName(name: string) {
  return await db
    .select()
    .from(ingredients)
    .where(ilike(ingredients.name, `%${name.toLowerCase()}%`))
    .limit(5);
}

export async function getIngredientById(id: string) {
  return await db.select().from(ingredients).where(eq(ingredients.id, id));
}
