"use client";

import { useEffect, useState } from "react";
import { getSession } from "@/store/session/cookies";

export const useAuth = () => {
  const session = getSession();
  const isAuth = session?.isAuth;
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (isAuth) {
      setIsLogin(true);
      return;
    }
    setIsLogin(false);
  }, [isAuth]);

  return { session, isLogin };
};
