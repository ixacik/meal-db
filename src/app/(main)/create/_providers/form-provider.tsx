"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  useForm,
  useFieldArray,
  UseFormReturn,
  UseFieldArrayReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getCategories } from "../_actions/category";
import { Category } from "@/db/schema";

const FormContext = createContext(
  {} as {
    form: UseFormReturn<z.infer<typeof createFormSchema>>;
    fieldArray: UseFieldArrayReturn<z.infer<typeof createFormSchema>>;
    categories: Category[];
  },
);

export const createFormSchema = z.object({
  name: z.string().min(2),
  calories: z.coerce.number().min(0).optional().default(0),
  protein: z.coerce.number().min(0).optional().default(0),
  carbs: z.coerce.number().min(0).optional().default(0),
  fat: z.coerce.number().min(0).optional().default(0),
  ingredients: z.array(
    z.object({
      dbId: z.string(),
      name: z.string(),
      image: z.string(),
      amount: z.coerce.number().min(0).optional().default(0),
    }),
  ),
  cookingTime: z.coerce.number(),
  category: z.string().min(1, { message: "Please select a category" }),
});

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const categories = await getCategories();
        setCategories(categories);
      } catch (error) {
        // TODO: Make this better
        alert("Unable to fetch categories, try reloading the page.");
      }
    }
    fetchCategories();
  }, []);

  const form = useForm<z.infer<typeof createFormSchema>>({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      name: "",
      calories: undefined,
      protein: undefined,
      carbs: undefined,
      fat: undefined,
      ingredients: [],
      cookingTime: 30,
      category: "",
    },
  });
  const fieldArray = useFieldArray({
    control: form.control,
    name: "ingredients",
  });

  return (
    <FormContext.Provider value={{ form, fieldArray, categories }}>
      {children}
    </FormContext.Provider>
  );
}

export function useCreateForm() {
  return useContext(FormContext);
}
