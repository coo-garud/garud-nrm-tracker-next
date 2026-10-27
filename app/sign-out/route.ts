import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { sessionId } = await auth();
    if (sessionId) {
      const client = await clerkClient();
      await client.sessions.revokeSession(sessionId).catch(() => null);
    }
  } catch (err) {
    console.log("Sign-out session revoke:", err);
  }

  const response = NextResponse.redirect(new URL("/sign-in", req.url), {
    status: 302,
  });

  response.cookies.delete("__session");
  response.cookies.delete("__clerk_db_jwt");
  response.cookies.delete("__clerk_client");

  return response;
}
