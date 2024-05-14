import { Card } from "@/components/ui/card";
import { Recipe } from "@/db/schema";
import { Clock, Flame, Plus } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function MealCard({ item }: { item: Recipe }) {
  return (
    <Card className="hover:scale-105 w-full transition-all duration-300 ease-in-out p-4">
      <div className="flex items-start justify-between">
        <div className="relative size-16">
          <Image
            src={item.image ?? "/placeholder.svg"}
            alt={item.name}
            fill
            className="object-cover rounded-lg shadow-xl"
          />
        </div>
        <Button variant={"default"} size={"icon"}>
          <Plus />
        </Button>
      </div>
      <div className="mt-4">
        <p className="font-medium">{item.name}</p>
        <p className="text-xs">{item.category}</p>
      </div>
      <div className="flex gap-8 mt-4">
        <div className="flex gap-1">
          <Clock className="size-[1em] text-red-500" strokeWidth={3} />
          <p className="text-xs whitespace-nowrap">{item.cookingMinutes} min</p>
        </div>
        <div className="flex gap-1">
          <Flame className="size-[1em] text-red-500" strokeWidth={3} />
          <p className="text-xs whitespace-nowrap">{item.calories} kcal</p>
        </div>
      </div>
    </Card>
  );
}
