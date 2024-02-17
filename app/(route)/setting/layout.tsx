import { ReactNode } from "react";
import { serverAuth } from "@/utils/serverAuth";

const SettingLayout = ({ children }: { children: ReactNode }) => {
  serverAuth("/signin");
  return children;
};
export default SettingLayout;
