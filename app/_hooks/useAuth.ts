import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "@/store/session/cookies";

export const useAuth = (href: string) => {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (!session) {
      router.push(href);
    }
  }, [session]);

  return session;
};
