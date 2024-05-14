import { auth, signIn, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";

export async function SignIn() {
  const session = await auth();

  if (session?.user) {
    return (
      <Popover>
        <PopoverTrigger>
          <Image
            src={session.user.image ?? ""}
            alt={session.user.name ?? "Profile Picture"}
            width={32}
            height={32}
            className="rounded-full"
          />
        </PopoverTrigger>
        <PopoverContent>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button type="submit">Sign Out</Button>
          </form>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button type="submit">Signin with Google</Button>
    </form>
  );
}
