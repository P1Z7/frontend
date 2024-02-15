import React, { ReactNode } from "react";
import MobileHeader from "@/components/header/MobileHeader";

const TopAppBarLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <MobileHeader />
      {children}
    </div>
  );
};

export default TopAppBarLayout;
