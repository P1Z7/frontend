"use client";

import { MouseEvent, useState } from "react";
import CloseIcon from "@/public/icon/close.svg";

type Handler = "onDelete";
type MappedHandler = {
  [key in Handler]?: (e?: MouseEvent) => void;
};

interface Props extends MappedHandler {
  label: string;
  selected?: boolean;
}

const ChipButton = ({ label, selected: initial = false, onDelete }: Props) => {
  const [isDelete, setIsDelete] = useState(false);

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
    <button onClick={handleDelete} className="flex-center border-main-pink-300 text-main-pink-white w-max flex-shrink-0 gap-4 rounded-lg border bg-sub-pink-bg px-12 py-4">
      <p className="text-14 font-500">{label}</p>
      {!!onDelete && <CloseIcon alt="태그 삭제" width={16} height={16} stroke="#FF50AA" />}
    </button>
  );
};
export default ChipButton;
