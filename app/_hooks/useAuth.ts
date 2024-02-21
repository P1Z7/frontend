"use client";

import { useEffect, useState } from "react";
import { Session, getSession } from "@/store/session/cookies";

export const useAuth = () => {
  const newSession = getSession();
  const isAuth = newSession?.isAuth;
  const [session, setSession] = useState<Session>();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (isAuth) {
      setSession(newSession);
      setIsLogin(true);
      return;
    }
    setSession(newSession);
    setIsLogin(false);
  }, [isAuth]);

  return { session, isLogin };
};
