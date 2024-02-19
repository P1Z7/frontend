"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getSession } from "@/store/session/cookies";

export const useAuth = (href: string) => {
  const router = useRouter();
  const session = getSession();

  useEffect(() => {
    if (!session) {
      router.push(href);
    }
  }, [session]);

  return session;
};
