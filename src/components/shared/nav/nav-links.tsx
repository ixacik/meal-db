"use client";

import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/utils/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();

  return NAV_LINKS.map((link) => (
    <Link
      key={link.label}
      href={link.href}
      className={cn("hover:text-primary text-muted-foreground", {
        "text-primary": link.href === pathname,
      })}
    >
      {link.label}
    </Link>
  ));
}
