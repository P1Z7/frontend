"use server";

import { cookies } from "next/headers";
import { Session } from "@/store/session/cookies";

export const serverSession = (): Session | null => {
  const sessionJSON = cookies().get("session")?.value;
  if (sessionJSON) {
    return JSON.parse(sessionJSON);
  }
  return null;
};
