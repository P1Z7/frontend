"use client";

import { ReactNode } from "react";
import TabButton from "@/components/TabButton";
import { myPageTabStore } from "@/store/mypage-tab/store";

const TOP_OFFSET = {
  mypage: "top-0",
  event: "top-72",
};

interface Props {
  children: ReactNode[];
  names: readonly string[];
  topOffset?: "mypage" | "event";
  isNarrow?: boolean;
}

const Tabs = ({ children, names, topOffset = "mypage", isNarrow: narrow = false }: Props) => {
  const { name: tabName, index: tabIndex, setTab } = myPageTabStore();

  return (
    <section className="h-full w-full">
      <div className={`sticky z-popup flex h-44 w-full items-center border-b border-gray-50 bg-white-black px-20 pc:h-56 ${TOP_OFFSET[topOffset]} ${narrow && "pc:static"}`}>
        {names.map((name, index) => (
          <TabButton key={name} onClick={() => setTab({ name, index })} selected={name === tabName} narrow={narrow}>
            {name}
          </TabButton>
        ))}
      </div>
      {children[tabIndex]}
    </section>
  );
};

export default Tabs;
