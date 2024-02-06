"use client";

import { MouseEvent, useState } from "react";
import CloseIcon from "@/public/icon/close.svg";

type Handler = "onClick" | "onDelete";
type MappedHandler = {
  [key in Handler]?: (e?: MouseEvent) => void;
};

interface Props extends MappedHandler {
  label: string;
  selected?: boolean;
}

const ChipButton = ({ label, selected: initial = false, onClick, onDelete }: Props) => {
  const [isDelete, setIsDelete] = useState(false);
  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    if (onClick) {
      onClick(e);
    }
  };

  const handleDelete = (e: MouseEvent) => {
    setIsDelete(true);
    if (onDelete) {
      onDelete(e);
    }
  };

  if (isDelete) {
    return null;
  }

  return (
    <button onClick={handleClick} className="flex-center w-max flex-shrink-0 gap-4 rounded-lg bg-gray-50 px-12 py-4 text-gray-700">
      <p className="text-14 font-500">{label}</p>
      {!!onDelete && <CloseIcon onClick={handleDelete} alt="태그 삭제" width={16} height={16} stroke="#A0A5B1" />}
    </button>
  );
};
export default ChipButton;
