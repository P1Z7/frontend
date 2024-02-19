import { Cookies } from "react-cookie";
import { serverSession } from "@/store/session/serverCookies";

export type Session = {
  isAuth: boolean;
  user: {
    email: string;
    userId: string;
    nickName: string;
    signupMethod: "opener" | "naver" | "kakao";
    profileImage: string | null;
  };
};

export const cookies = new Cookies();

export const setCookies: typeof cookies.set = (name, value, options) => {
  return cookies.set(name, value, { ...options });
};

export const getCookies: typeof cookies.get = (name: string) => {
  return cookies.get(name);
};

export const deleteCookies: typeof cookies.remove = (name, options) => {
  return cookies.remove(name, options);
};

export const setSession = (newSession: Session) => (deleteCookies("session"), setCookies("session", newSession, { path: "/" }));

export const getSession = (): Session | undefined => (typeof window !== "undefined" ? getCookies("session") : serverSession());

export const outSession = () => cookies.remove("session", { path: "/" });
