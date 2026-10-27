import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { sessionId } = await auth();

  // Redirect to Clerk's sign-out endpoint
  return NextResponse.redirect(
    new URL(
      `/api/auth/logout?redirectUrl=${encodeURIComponent(
        new URL("/sign-in", req.url).toString()
      )}`,
      req.url
    )
  );
}
