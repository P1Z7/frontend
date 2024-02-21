import { ButtonHTMLAttributes } from "react";

interface TabButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected: boolean;
  narrow?: boolean;
}

const TabButton = ({ children, onClick, selected, narrow }: TabButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${narrow && "pc:w-120 pc:grow-0"} grow py-12 text-center text-14 font-500 pc:py-16 pc:text-16 ${selected ? "border-b-2 border-gray-900 font-600 text-gray-900" : "font-500 text-gray-500"}`}
    >
      {children}
    </button>
  );
};

export default TabButton;
