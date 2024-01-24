"use client";

import { ReactNode, useState } from "react";
import TabButton from "@/components/TabButton";

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
