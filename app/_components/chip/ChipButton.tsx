"use client";

import { ButtonHTMLAttributes, Ref, forwardRef } from "react";
import { GiftType } from "@/types/index";
import { GIFT_LIST, TAG_EMOJI } from "@/constants/post";
import CloseIcon from "@/public/icon/close.svg";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  selected?: boolean;
  canDelete?: boolean;
}

const ChipButton = forwardRef(({ label, selected, canDelete, ...rest }: Props, ref: Ref<HTMLButtonElement>) => {
  return (
    <button
      type="button"
      ref={ref}
      {...rest}
      className={`flex-center w-max flex-shrink-0 gap-4 rounded-lg px-12 py-4  ${canDelete && "border border-main-pink-300 bg-sub-pink-bg text-main-pink-white"} ${selected ? "bg-gray-900 text-white-black" : "bg-gray-50 text-gray-700"}`}
    >
      <p className="text-14 font-500">{`${GIFT_LIST.includes(label as GiftType) ? TAG_EMOJI[label as GiftType] : ""} ${label}`}</p>
      {canDelete && <CloseIcon alt="태그 삭제" width={16} height={16} stroke="#FF50AA" />}
    </button>
  );
});
export default ChipButton;
