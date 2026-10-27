import { NextResponse } from "next/server";

export async function GET(req: Request) {
  // Redirect to sign-in which will clear the Clerk session via middleware
  const response = NextResponse.redirect(new URL("/sign-in", req.url));

  // Clear Clerk cookies to force logout
  response.cookies.delete("__clerk_db_jwt");
  response.cookies.delete("__session");

  return response;
}
