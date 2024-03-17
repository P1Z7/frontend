import { cookies } from "next/headers";
import { ReactNode } from "react";
import TabButton from "@/components/TabButton";
import { Tab } from "@/store/tab/cookies";

interface Props {
  children: ReactNode[];
  names: readonly string[];
  page?: "mypage" | "event";
  eventId?: string;
  isNarrow?: boolean;
}
const Tabs = ({ children, names, page = "mypage", eventId, isNarrow: narrow = false }: Props) => {
  const tab: Tab = JSON.parse(cookies().get(eventId ? page + "/" + eventId : page)?.value ?? `{ "name": "${names[0]}", "index": "0"}`);

  return (
    <section className="h-full w-full">
      <div className={`sticky top-72 z-popup flex h-44 w-full items-center border-b border-gray-50 bg-white-black px-20 tablet:top-64 pc:h-56 ${narrow && "pc:static"}`}>
        {names.map((name, index) => (
          <TabButton key={name} tab={{ name, index }} selected={name === tab.name} narrow={narrow}>
            {name}
          </TabButton>
        ))}
      </div>
      {children[tab.index]}
    </section>
  );
};

export default Tabs;
