import { Beef } from "lucide-react";
import { SignIn } from "./sign-in-button";
import NavLinks from "./nav-links";

export default function Nav() {
  return (
    <div className="h-20 z- flex justify-between px-10 items-center bg-card border-border border-b w-full fixed inset-0 bottom-auto shadow-xl">
      <div className="flex items-center gap-2 text-accent">
        <Beef strokeWidth={2} />
        <h1 className="text-xl font-medium">mealDB</h1>
      </div>
      {/* nav items */}
      <ul className="flex gap-8 items-center">
        <NavLinks />
        <SignIn />
      </ul>
    </div>
  );
}
