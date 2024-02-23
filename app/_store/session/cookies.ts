import { Cookies } from "react-cookie";

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

export const setSession = (newSession: Session) => (
  deleteCookies("session"), setCookies("session", newSession, { path: "/", expires: new Date(Date.now() + 24 * 60 * 60 * 1000) })
);

export const getSession = (): Session | undefined => getCookies("session");

export const outSession = () => cookies.remove("session", { path: "/" });
