import { NextRequest, NextResponse } from "next/server";
import { serverSession } from "@/store/session/serverCookies";

export const middleware = async (req: NextRequest) => {
  const session = serverSession();
  if (!session) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }
};

export const config = {
  matcher: ["/mypage", "/post", "/event/:eventId/edit"],
};
