"use client";

import { useRouter } from "next/navigation";
import { useSession } from "@/store/session/cookies";

export const useAuth = (href: string) => {
  const router = useRouter();
  const session = useSession();

  if (!session) {
    router.push(href);
  }

  return session;
};
