import { Cookies } from "react-cookie";

export const cookies = new Cookies();

export const setCookies: typeof cookies.set = (name, value, options) => {
  return cookies.set(name, value, { ...options });
};

export const getCookies: typeof cookies.get = (name: string) => {
  return cookies.get(name);
};

export const setSession = (newSession: { isAuth: boolean; user: any }) => setCookies("session", newSession);

export const useSession = () => getCookies("session");
