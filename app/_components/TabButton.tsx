"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { ButtonHTMLAttributes } from "react";
import { Tab, setTabCookie } from "@/store/mypage-tab/cookies";

interface TabButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  tab: Tab;
  selected: boolean;
  narrow?: boolean;
}

const TabButton = ({ children, tab, selected, narrow }: TabButtonProps) => {
  const pathname = usePathname();
  const param = useParams();
  const router = useRouter();

  const handleClick = () => {
    let page: "mypage" | `event/${string}`;

    if (pathname.includes("mypage")) {
      page = "mypage";
    } else {
      page = `event/${param.eventId}`;
    }

    setTabCookie(tab, page);
    router.refresh();
  };
  return (
    <button
      onClick={handleClick}
      className={`${narrow && "pc:w-120 pc:grow-0"} grow py-12 text-center text-14 font-500 pc:py-16 pc:text-16 ${selected ? "border-b-2 border-gray-900 font-600 text-gray-900" : "font-500 text-gray-500"}`}
    >
      {children}
    </button>
  );
};

export default TabButton;
