import BackButton from "app/(route)/setting/_components/BackButton";
import { ReactElement } from "react";

const SettingLayout = ({ children }: { children: ReactElement }) => {
  return (
    <div className="flex h-dvh w-dvw flex-col px-20 pt-32">
      <div className="flex items-center gap-8 self-start pb-20">
        <BackButton />
      </div>
      {children}
    </div>
  );
};
export default SettingLayout;
