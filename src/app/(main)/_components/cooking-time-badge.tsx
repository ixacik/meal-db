import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

export default function CookingTimeBadge({ time }: { time: number }) {
  return (
    <div className="flex items-center gap-1">
      <Badge className="p-[0.25rem]">
        <Clock className="size-[0.8em]" strokeWidth={4} />
      </Badge>
      <Badge className="px-[2px]">
        <div className="flex gap-1 items-center w-20">
          <div
            className={cn("w-full rounded-full h-[0.25rem] bg-white/25", {
              "bg-green-500": time === 0,
              "bg-yellow-500": time === 1,
              "bg-red-500": time === 2,
            })}
          />
          <div
            className={cn("w-full rounded-full h-[0.25rem] bg-white/25", {
              "bg-yellow-500": time === 1,
              "bg-red-500": time === 2,
            })}
          />
          <div
            className={cn("w-full rounded-full h-[0.25rem] bg-white/25", {
              "bg-red-500": time === 2,
            })}
          />
        </div>
      </Badge>
    </div>
  );
}
