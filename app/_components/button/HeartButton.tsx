import { useState } from "react";
import Heart from "@/public/icon/heart.svg";

interface Props {
  small?: boolean;
  selected?: boolean;
  onClick?: () => void;
}

const HeartButton = ({ small = false, selected = false, onClick, ...props }: Props) => {
  const [selectedBt, setSelectedBt] = useState(selected);

  const handleClick = () => {
    setSelectedBt((prev) => !prev);
    onClick && onClick();
  };

  return (
    <button className="w-fit" onClick={handleClick} {...props}>
      <Heart
        width={small ? "20" : "24"}
        height={small ? "20" : "24"}
        viewBox="0 0 24 24"
        stroke={selectedBt ? "#FF50AA" : small ? "#A0A5B1" : "white"}
        fill={selectedBt ? "#FF50AA" : "none"}
      />
    </button>
  );
};

export default HeartButton;
