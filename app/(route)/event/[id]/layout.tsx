import { ReactElement } from "react";
import Header from "./_components/Header";

interface Props {
  children: ReactElement;
  params: { id: number };
}

const SettingLayout = ({ children, params }: Props) => {
  return (
    <>
      <Header params={params} />
      {children}
    </>
  );
};
export default SettingLayout;
