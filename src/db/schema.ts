import { relations } from "drizzle-orm";
import { integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  passwordHash: varchar("password_hash").notNull(),
});

export const recipes = pgTable("recipes", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name").notNull(),
  image: varchar("image"),
  cookingMinutes: integer("cooking_minutes").notNull(),
  portions: integer("portions").notNull(),
  calories: integer("calories").notNull(),
  protein: integer("protein").notNull(),
  carbs: integer("carbs").notNull(),
  fat: integer("fat").notNull(),
  category: uuid("category").references(() => categories.id, {
    onDelete: "cascade",
  }),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
});

export const ingredients = pgTable("ingredients", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name").notNull(),
  image: varchar("image"),
  measuredIn: varchar("measured_in", { length: 5 }).notNull(),
});

export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name").notNull(),
});

// join tables
export const recipesToIngredients = pgTable("recipes_to_ingredients", {
  recipeId: uuid("recipe_id").references(() => recipes.id),
  ingredientId: uuid("ingredient_id").references(() => ingredients.id, {
    onDelete: "cascade",
  }),
});

// relations
export const usersRelations = relations(users, ({ many }) => ({
  recipes: many(recipes),
}));

export const recipesRelations = relations(recipes, ({ many, one }) => ({
  user: one(users, {
    fields: [recipes.userId],
    references: [users.id],
  }),
  recipesToIngredients: many(recipesToIngredients),
}));

export const ingredientsRelations = relations(ingredients, ({ many }) => ({
  recipes: many(recipesToIngredients),
}));

export const recipesToIngredientsRelations = relations(
  recipesToIngredients,
  ({ one }) => ({
    recipe: one(recipes, {
      fields: [recipesToIngredients.recipeId],
      references: [recipes.id],
    }),
    ingredient: one(ingredients, {
      fields: [recipesToIngredients.ingredientId],
      references: [ingredients.id],
    }),
  }),
);

// types

export type User = typeof users.$inferSelect;
export type UserInsert = typeof users.$inferInsert;

export type Recipe = typeof recipes.$inferSelect;
export type RecipeInsert = typeof recipes.$inferInsert;

export type Ingredient = typeof ingredients.$inferSelect;
export type IngredientInsert = typeof ingredients.$inferInsert;

export type Category = typeof categories.$inferSelect;
export type CategoryInsert = typeof categories.$inferInsert;
