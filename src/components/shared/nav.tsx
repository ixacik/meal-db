"use client";

import { Beef } from "lucide-react";
import { NAV_LINKS } from "@/utils/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  return (
    <div className="h-20 z- flex justify-between px-10 items-center bg-card border-border border-b w-full fixed inset-0 bottom-auto shadow-xl">
      <div className="flex items-center gap-2 text-accent">
        <Beef strokeWidth={2} />
        <h1 className="text-xl font-medium">mealDB</h1>
      </div>
      {/* nav items */}
      <ul className="flex gap-8 items-center">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={cn("hover:text-primary text-muted-foreground", {
              "text-primary": link.href === pathname,
            })}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </div>
  );
}
