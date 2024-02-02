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
  const [selected, setSelected] = useState(initial);
  const [isDelete, setIsDelete] = useState(false);
  const handleClick = (e: MouseEvent) => {
    setSelected((prev) => !prev);
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
    <button onClick={handleClick} className={`flex-center w-max gap-4 rounded-lg px-12 py-4 ${selected ? "bg-gray-900 text-white-black" : "bg-gray-50 text-gray-700"}`}>
      <p className="text-14 font-500">{label}</p>
      {!!onDelete && <CloseIcon onClick={handleDelete} alt="태그 삭제" width={16} height={16} stroke={selected ? "#FFF" : "#A0A5B1"} />}
    </button>
  );
};
export default ChipButton;
