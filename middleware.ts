import { NextRequest, NextResponse } from "next/server";
import toast from "react-hot-toast";
import { serverSession } from "@/store/session/serverCookies";

export const middleware = async (req: NextRequest) => {
  const session = serverSession();
  const pathname = req.nextUrl.pathname;
  const noNeedLogin = SIGNS.includes(pathname);

  if (!session && !noNeedLogin) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  if (session && noNeedLogin) {
    return NextResponse.redirect(new URL("/", req.url));
  }
};

export const config = {
  matcher: ["/mypage", "/post", "/event/:eventId/edit", "/signin", "/signup"],
};

const SIGNS = ["/signin", "/signup"];
