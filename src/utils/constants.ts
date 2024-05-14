import { v4 as uuid } from "uuid";
import { faker } from "@faker-js/faker";
import { Recipe } from "@/db/schema";

export const NAV_LINKS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Generate",
    href: "/generate",
  },
  {
    label: "Create",
    href: "/create",
  },
];

const difficulty = ["Easy", "Medium", "Hard"];

export const fakeRecipes: Recipe[] = Array.from({ length: 100 }, () => ({
  id: uuid(),
  name: faker.commerce.productName(),
  image: faker.image.urlLoremFlickr({ category: "food" }),
  cookingMinutes: faker.number.int({ min: 1, max: 6 }) * 10,
  difficulty: faker.helpers.arrayElement(difficulty),
  portions: faker.number.int({ min: 1, max: 8 }),
  calories: faker.number.int({ min: 100, max: 1000 }),
  protein: faker.number.int({ min: 10, max: 50 }),
  carbs: faker.number.int({ min: 10, max: 50 }),
  fat: faker.number.int({ min: 10, max: 50 }),
  category: faker.commerce.department(),
}));
