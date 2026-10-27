import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const response = NextResponse.redirect(
    new URL("/", req.url),
    { status: 302 }
  );

  response.cookies.delete("__session");
  response.cookies.delete("__clerk_db_jwt");

  return response;
}
