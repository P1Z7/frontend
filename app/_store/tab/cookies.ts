import { deleteCookies, getCookies, setCookies } from "@/store/session/cookies";

export type Tab = {
  name: string;
  index: number;
};

export type TabPage = "mypage" | `event/${string}`;

export const setTabCookie = (tab: Tab, page: TabPage) => {
  deleteTabCookie(page);

  const expires = new Date(Date.now() + 30 * 1000);
  setCookies(page, tab, { path: "/", expires });
};

export const getTabCookie = (page: TabPage): Tab => getCookies(page);

export const deleteTabCookie = (page: TabPage) => deleteCookies(page, { path: "/" });
