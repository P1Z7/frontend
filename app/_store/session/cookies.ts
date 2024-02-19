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

export const deleteCookies: typeof cookies.remove = (name) => {
  return cookies.remove(name);
};

export const setSession = (newSession: Session) => (deleteCookies("session"), setCookies("session", newSession));

export const useSession = (): Session | undefined => getCookies("session");

export const outSession = () => deleteCookies("session");
