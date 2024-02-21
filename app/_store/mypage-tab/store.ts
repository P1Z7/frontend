import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const TABLIST = ["행사", "아티스트", "후기"];

type Tab = {
  name: string;
  index: number;
};

interface TabStore extends Tab {
  setTab: ({ name, index }: Tab) => void;
}

export const myPageTabStore = create(
  persist<TabStore>(
    (set) => ({
      name: TABLIST[0],
      index: 0,
      setTab: ({ name, index }) => set({ name, index }),
    }),
    {
      name: "myPageTab",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
