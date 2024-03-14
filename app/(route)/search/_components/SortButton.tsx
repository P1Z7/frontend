import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  selected: boolean;
}

const SortButton = ({ children, onClick, selected }: Props) => {
  return (
    <button onClick={onClick} className={`h-20 shrink-0 text-14 font-500 ${selected ? "text-gray-900" : "text-gray-400"}`}>
      {children}
    </button>
  );
};

export default SortButton;
