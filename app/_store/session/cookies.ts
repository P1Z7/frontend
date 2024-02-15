import { Cookies } from "react-cookie";

type Session = {
  isAuth: boolean;
  user: {
    userId: string;
    nickName: string;
    profileImage: string;
  };
};

export const cookies = new Cookies();

export const setCookies: typeof cookies.set = (name, value, options) => {
  return cookies.set(name, value, { ...options });
};

export const getCookies: typeof cookies.get = (name: string) => {
  return cookies.get(name);
};

export const setSession = (newSession: Session) => setCookies("session", newSession);

export const useSession = (): Session => getCookies("session");
