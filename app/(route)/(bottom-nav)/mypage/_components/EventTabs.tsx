"use client";

import { ButtonHTMLAttributes, ReactNode, useState } from "react";
import Button from "@/components/button";

interface Tab {
  name: string;
  index: number;
}

interface Props {
  children: ReactNode[];
  names: readonly [string, string];
}

const EventTabs = ({ children, names }: Props) => {
  const [selectedTab, setSelectedTab] = useState<Tab>({ name: names[0], index: 0 });

  return (
    <section className="relative h-full w-full">
      <div className="absolute left-1/2 top-16 z-heart flex h-40 w-300 -translate-x-1/2 items-center gap-8 rounded-full border border-gray-50 bg-white-white shadow-[0_0_8px_0_rgba(0,0,0,0.08)] pc:left-auto pc:right-0 pc:top-8 pc:mx-40 pc:w-220 pc:-translate-x-0 pc:shadow-none">
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

export default EventTabs;

interface TabButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected: boolean;
}

const TabButton = ({ children, onClick, selected }: TabButtonProps) => {
  return (
    <div className="w-1/2 p-4">
      {selected ? (
        <Button onClick={onClick} size="sm" type="lined">
          {children}
        </Button>
      ) : (
        <button className="flex-center w-full shrink-0 grow gap-4 px-16 py-12 text-center text-14 font-600 text-gray-500" onClick={onClick}>
          {children}
        </button>
      )}
    </div>
  );
};
