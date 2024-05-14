"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export default function RecipeSearch({ className }: { className?: string }) {
  const params = useSearchParams();
  const [query, setQuery] = useState(() => params.get("q") || "");
  const [search] = useDebounce(query, 200);
  const router = useRouter();

  useEffect(() => {
    if (search) {
      router.push(`/?q=${search}`);
    } else {
      router.push("/");
    }
  }, [search, router]);

  return (
    <div
      className={cn(
        " flex items-center gap-2 px-4 border rounded-lg overflow-hidden shadow-xl ",
        className
      )}
    >
      <Search className="size-[1em] text-accent" />
      <Input
        placeholder="Search for a recipe..."
        className="border-none "
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
