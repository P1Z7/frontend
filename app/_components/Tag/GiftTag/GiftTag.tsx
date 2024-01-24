import classNames from "classnames";
import { ReactNode, useState } from "react";

interface Props {
  children: ReactNode;
  handleClick: (gift: any) => void;
}

const GiftTag = ({ children, handleClick }: Props) => {
  const [selected, setSelected] = useState(false);

  const handleTagClick = () => {
    setSelected((prev) => !prev);
    handleClick(children);
  };

  return (
    <span className={classNames("cursor-pointer rounded-sm border-2 border-neutral-800", { "bg-red-100": selected })} onClick={handleTagClick}>
      {children}
    </span>
  );
};

export default GiftTag;
