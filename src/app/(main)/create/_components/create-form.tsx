"use client";

import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChevronsUpDown, Search, Trash } from "lucide-react";
import { createFormSchema, useCreateForm } from "../_providers/form-provider";
import { z } from "zod";
import AddIngredientCard from "./addIngredientCard/add-ingredient-card";
import Image from "next/image";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function CreateForm() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { form, fieldArray, categories } = useCreateForm();

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof createFormSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full max-w-lg mx-auto "
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter name" {...field} />
              </FormControl>
              <FormDescription>
                This the name that will be displayed on the recipe.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2 items-center">
          <FormField
            control={form.control}
            name="calories"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Calories</FormLabel>
                <FormControl>
                  <Input placeholder="Amount" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="protein"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Protein</FormLabel>
                <FormControl>
                  <Input placeholder="Amount" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="carbs"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Carbs</FormLabel>
                <FormControl>
                  <Input placeholder="Amount" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fat</FormLabel>
                <FormControl>
                  <Input placeholder="Amount" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          <FormLabel>Ingredients</FormLabel>
          {fieldArray.fields.map((field, index) => (
            <FormItem key={index}>
              <FormControl className="flex gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex flex-grow items-center gap-2">
                    <Image
                      src={field.image}
                      alt={field.name}
                      width={32}
                      height={32}
                    />
                    <p>{field.name}</p>
                  </div>
                  <Input
                    className="max-w-[100px]"
                    value={field.amount}
                    placeholder="Amount"
                    defaultValue={field.amount}
                    {...form.register(`ingredients.${index}.amount`)}
                  />
                  <Button
                    variant={"default"}
                    type="button"
                    size={"icon"}
                    className="aspect-square"
                    onClick={() => fieldArray.remove(index)}
                  >
                    <Trash className="size-4" />
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          ))}
          <AddIngredientCard />
        </div>
        <div className="flex gap-8">
          <FormField
            control={form.control}
            name="cookingTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Cooking Time: {field.value} minutes</FormLabel>
                <FormControl>
                  <Slider
                    {...field}
                    value={[field.value]}
                    onValueChange={field.onChange}
                    min={10}
                    max={90}
                    step={10}
                    className="pt-4"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Category</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {selectedCategory || "Select a category"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <div className="flex items-center px-4">
                      <Search
                        className="size-[0.8em] text-primary"
                        strokeWidth={2.5}
                      />
                      <Input className="border-none" placeholder="Search" />
                    </div>
                    <div>
                      {categories.map((category) => (
                        <div
                          key={category.id}
                          className="text-sm flex items-center px-4 py-2 hover:bg-accent hover:text-accent-foreground cursor-pointer"
                          onClick={() => {
                            // HACK: this isn't the best, not a single source of truth for selected category
                            setSelectedCategory(category.name);
                            field.onChange(category.id);
                          }}
                        >
                          <p>{category.name}</p>
                        </div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
