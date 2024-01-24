import classNames from "classnames";
import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected: boolean;
}

const TabButton = ({ children, onClick, selected }: Props) => {
  return (
    <button onClick={onClick} className={classNames("border border-solid border-black", { "bg-black text-white": selected })}>
      {children}
    </button>
  );
};

export default TabButton;
