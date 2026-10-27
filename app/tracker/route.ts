import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { TRACKER_HTML } from "./tracker-source";

export async function GET(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return new NextResponse(TRACKER_HTML, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "private, no-store",
    },
  });
}
