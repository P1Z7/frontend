"use client";

import { useParams, usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import PcHeader from "../header/PcHeader";
import DottedLayout from "./DottedLayout";
import PinkLayout from "./PinkLayout";

interface LayoutType {
  type: "none" | "dotted" | "pink";
  size: "narrow" | "wide";
}

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const pathname = usePathname();
  const { eventId, editId } = useParams();
  const [layout, setLayout] = useState<LayoutType>({ type: "dotted", size: "narrow" });

  useEffect(() => {
    switch (pathname) {
      case `/event/${eventId}`:
        setLayout({ type: "dotted", size: "narrow" });
        break;
      case "/":
      case "/mypage":
      case "/search":
      case "/my-artist-event":
        setLayout({ type: "dotted", size: "wide" });
        break;
      case "/signin":
      case "/signup":
      case "/setting/password":
      case "/setting/profile":
      case `/event/${eventId}/post`:
      case `/event/${eventId}/edit`:
      case `/event/${eventId}/approve`:
      case `/event/${eventId}/approve/${editId}`:
      case "/post":
        setLayout({ type: "pink", size: "narrow" });
        break;
      case "/setting/artist":
        setLayout({ type: "pink", size: "wide" });
        break;
      case "/oauth":
        setLayout({ type: "none", size: "narrow" });
        break;
    }
  }, [pathname]);

  if (layout.type === "none") {
    return <>{children}</>;
  }

  if (layout.type === "dotted") {
    return (
      <>
        <PcHeader />
        <DottedLayout size={layout.size}>{children}</DottedLayout>
      </>
    );
  }

  return (
    <>
      <PcHeader />
      <PinkLayout size={layout.size}>{children}</PinkLayout>
    </>
  );
};

export default Layout;
