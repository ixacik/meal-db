"use server";

import { signIn, signOut } from "@/auth";

export async function authLogin(provider: string) {
  await signIn(provider, { redirectTo: "/" });
}

export async function authSignOut() {
  await signOut();
}
