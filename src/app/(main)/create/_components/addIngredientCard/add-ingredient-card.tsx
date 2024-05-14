import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import IngredientSearch from "./ingredient-search";

export default function AddIngredientCard() {
  return (
    <>
      <Dialog>
        <DialogTrigger className="w-full focus:outline-primary/50">
          <Card className="flex items-center gap-4 border-dashed p-4 border-accent/50 text-accent/50 hover:bg-primary/10 cursor-pointer">
            <PlusIcon />
            <p>Add an Ingredient</p>
          </Card>
        </DialogTrigger>
        <DialogContent className="p-0 border-none">
          <IngredientSearch />
        </DialogContent>
      </Dialog>
    </>
  );
}
