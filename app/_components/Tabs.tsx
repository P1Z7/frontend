"use client";

import { ButtonHTMLAttributes, ReactNode, useState } from "react";

const TOP_OFFSET = {
  mypage: "top-0",
  event: "top-72",
};
interface Tab {
  name: string;
  index: number;
}

interface Props {
  children: ReactNode[];
  names: readonly string[];
  topOffset?: "mypage" | "event";
}

const Tabs = ({ children, names, topOffset = "mypage" }: Props) => {
  const [selectedTab, setSelectedTab] = useState<Tab>({ name: names[0], index: 0 });

  return (
    <section className="w-full">
      <div className={`sticky z-popup flex h-44 w-full items-center border-b border-gray-50 bg-white-black px-20 pc:h-56 ${TOP_OFFSET[topOffset]}`}>
        {names.map((name, index) => (
          <TabButton key={name} onClick={() => setSelectedTab({ name, index })} selected={name === selectedTab.name}>
            {name}
          </TabButton>
        ))}
      </div>
      {children[selectedTab.index]}
    </section>
  );
};

export default Tabs;

interface TabButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected: boolean;
}

const TabButton = ({ children, onClick, selected }: TabButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`grow py-12 text-center text-14 font-500 pc:py-16 pc:text-16 ${selected ? "border-b-2 border-gray-900 font-600 text-gray-900" : "font-500 text-gray-500"}`}
    >
      {children}
    </button>
  );
};
