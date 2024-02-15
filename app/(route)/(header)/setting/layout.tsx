import { ReactNode } from "react";
import { authRedirectServer } from "@/utils/authRedirect";

const SettingLayout = ({ children }: { children: ReactNode }) => {
  authRedirectServer("/signin");
  return children;
};
export default SettingLayout;
