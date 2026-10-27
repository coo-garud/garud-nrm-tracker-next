import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await auth.signOut();
  return NextResponse.redirect(new URL("/sign-in", req.url));
}
