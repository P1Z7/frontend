import AuthProvider from "app/_providers/AuthProvider";
import { ReactNode } from "react";

const SigninLayout = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
export default SigninLayout;
