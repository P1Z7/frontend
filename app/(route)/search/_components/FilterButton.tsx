import { ButtonHTMLAttributes, ReactNode } from "react";
import DownArrowIcon from "@/public/icon/arrow-down_sm.svg";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  selected: boolean;
}

const FilterButton = ({ children, onClick, selected }: Props) => {
  return (
    <button onClick={onClick} className={`flex-center h-28 shrink-0 gap-4 px-8 text-14 font-500 pc:text-16 ${selected ? "text-gray-700" : "text-gray-400"}`}>
      {children}
      <DownArrowIcon stroke={selected ? "#494F5A" : "#A0A5B1"} width="20" height="20" viewBox="0 0 24 24" />
    </button>
  );
};

export default FilterButton;
