import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  selected: boolean;
}

const StatusButton = ({ children, selected, onClick }: Props) => {
  return (
    <button onClick={onClick} className={`flex-center h-32 rounded-full px-12 text-14 ${selected ? "bg-gray-600 text-gray-50" : "bg-gray-50 text-gray-700"}`}>
      {children}
    </button>
  );
};

export default StatusButton;
