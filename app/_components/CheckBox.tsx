import { ReactNode } from "react";
import OffCheckBoxIcon from "@/public/icon/checkbox-off.svg";
import OnCheckBoxIcon from "@/public/icon/checkbox-on.svg";

interface Props {
  isCheck: boolean;
  setIsCheck: any;
  children: ReactNode;
}

const CheckBox = ({ isCheck, setIsCheck, children }: Props) => {
  return (
    <label className="flex cursor-pointer items-center gap-8 text-14 font-500 text-gray-700">
      {isCheck ? (
        <button type="button" onClick={() => setIsCheck(false)}>
          <OnCheckBoxIcon />
        </button>
      ) : (
        <button type="button" onClick={() => setIsCheck(true)}>
          <OffCheckBoxIcon />
        </button>
      )}
      {children}
    </label>
  );
};

export default CheckBox;
