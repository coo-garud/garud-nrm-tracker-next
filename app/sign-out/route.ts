import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { sessionId } = await auth();
    if (sessionId) {
      const client = await clerkClient();
      await client.sessions.revokeSession(sessionId);
    }
  } catch (error) {
    console.error("Sign-out error:", error);
  }

  const response = NextResponse.redirect(new URL("/sign-in", req.url));
  response.cookies.clear();
  return response;
}
