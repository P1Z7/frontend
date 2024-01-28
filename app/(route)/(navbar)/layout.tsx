import { ReactNode } from "react";
import BottomNav from "../_components/BottomNav";

const NavbarLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
      <BottomNav />
    </>
  );
};

export default NavbarLayout;
