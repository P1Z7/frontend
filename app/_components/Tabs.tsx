"use client";

import classNames from "classnames";
import { ButtonHTMLAttributes, ReactNode, useState } from "react";

interface Tab {
  name: string;
  index: number;
}

interface Props {
  children: ReactNode[];
  names: readonly string[];
}

const Tabs = ({ children, names }: Props) => {
  const [selectedTab, setSelectedTab] = useState<Tab>({ name: names[0], index: 0 });

  return (
    <section>
      <ul className="flex gap-12">
        {names.map((name, index) => (
          <li key={name}>
            <TabButton onClick={() => setSelectedTab({ name, index })} selected={name === selectedTab.name}>
              {name}
            </TabButton>
          </li>
        ))}
      </ul>
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
    <button onClick={onClick} className={classNames("border border-solid border-black", { "bg-black text-white": selected })}>
      {children}
    </button>
  );
};
