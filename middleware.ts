import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
  const session = req.cookies.get("session")?.value;
  const pathname = req.nextUrl.pathname;
  const noNeedLogin = SIGNS.includes(pathname);

  if (!session && !noNeedLogin) {
    return NextResponse.rewrite(new URL("/signin", req.url));
  }

  if (session && noNeedLogin) {
    return NextResponse.rewrite(new URL("/", req.url));
  }
};

export const config = {
  matcher: ["/mypage", "/post", "/event/:eventId/edit", "/signin", "/signup"],
};

const SIGNS = ["/signin", "/signup"];
