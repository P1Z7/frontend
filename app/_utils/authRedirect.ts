"use server";

import { redirect } from "next/navigation";
import { serverSession } from "@/store/session/serverCookies";

export const authRedirectServer = (href: string) => {
  const session = serverSession();
  if (!session) {
    redirect(href);
  }
};
