import classNames from "classnames";
import { ReactNode, useEffect, useState } from "react";

interface Props {
  children: ReactNode;
  handleClick: (gift: any) => void;
  initialChecked: boolean;
}

const GiftTag = ({ children, handleClick, initialChecked }: Props) => {
  const [selected, setSelected] = useState(false);

  const handleTagClick = () => {
    setSelected((prev) => !prev);
    handleClick(children);
  };

  useEffect(() => {
    if (initialChecked) setSelected(true);
  }, []);

  return (
    <span className={classNames("cursor-pointer rounded-sm border-2 border-neutral-800", { "bg-red-100": selected })} onClick={handleTagClick}>
      {children}
    </span>
  );
};

export default GiftTag;
