import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected: boolean;
}

const TabButton = ({ children, onClick, selected }: Props) => {
  return (
    <button onClick={onClick} className={`border border-solid border-black ${selected ? "bg-black text-white" : ""}`}>
      {children}
    </button>
  );
};

export default TabButton;
