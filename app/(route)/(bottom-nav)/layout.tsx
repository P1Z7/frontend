import React, { ReactNode } from "react";
import BottomNav from "@/components/BottomNav";

const BottomNavLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <BottomNav />
      {children}
    </div>
  );
};

export default BottomNavLayout;
