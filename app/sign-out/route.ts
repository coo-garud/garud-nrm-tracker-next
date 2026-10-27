import { signOut } from "@clerk/nextjs/server";

export async function GET() {
  await signOut({ redirectUrl: "/sign-in" });
}
