import React, { ReactNode } from "react";
import MobileHeader from "@/components/header/MobileHeader";

const TopAppBarLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <MobileHeader />
      {children}
    </>
  );
};

export default TopAppBarLayout;
