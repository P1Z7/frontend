import { Cookies } from "react-cookie";

export type Session = {
  isAuth: boolean;
  user: {
    userId: string;
    nickName: string;
    profileImage: string | null;
    email: string;
    signupMethod: "opener" | "kakao" | "naver";
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

export const getSession = (): Session | undefined => getCookies("session");

export const outSession = () => cookies.remove("session", { path: "/" });
