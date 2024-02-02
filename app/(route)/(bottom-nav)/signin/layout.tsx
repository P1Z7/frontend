import { ReactNode } from "react";
import AuthProvider from "@/providers/AuthProvider";

const SigninLayout = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
export default SigninLayout;
