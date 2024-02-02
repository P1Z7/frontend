import React, { ReactNode } from "react";
import Header from "@/components/Header";

const TopAppBarLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default TopAppBarLayout;
