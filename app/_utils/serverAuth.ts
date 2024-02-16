"use server";

import { redirect } from "next/navigation";
import { serverSession } from "@/store/session/serverCookies";

export const serverAuth = async (href: string) => {
  const session = serverSession();
  if (!session) {
    redirect(href);
  }
  return session;
};
