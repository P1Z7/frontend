"use client";

import { useState } from "react";
import { BottomSheetBaseType, GiftType } from "@/types/index";
import ChipButton from "../chip/ChipButton";
import BottomSheet from "./BottomSheetMaterial";

interface Props extends BottomSheetBaseType {
  setGiftsFilter: (gift: GiftType[]) => void;
  initialGift: GiftType[];
}

const GiftsBottomSheet = ({ closeBottomSheet, refs, setGiftsFilter, initialGift }: Props) => {
  const [gifts, setGifts] = useState<GiftType[]>(initialGift);

  const handleGiftClick = (gift: GiftType) => {
    if (gifts.includes(gift)) {
      setGifts((prev) => {
        const nextGift = prev.filter((currGift) => currGift !== gift);
        return nextGift;
      });
    } else {
      setGifts((prev) => [...prev, gift]);
    }
  };

  const handleGiftSubmit = () => {
    setGiftsFilter([...gifts]);
    closeBottomSheet();
  };

  return (
    <BottomSheet.Frame closeBottomSheet={closeBottomSheet} ref={refs.sheet}>
      <BottomSheet.Title>특전 선택</BottomSheet.Title>
      <div ref={refs.content}>
        <div className="flex flex-wrap gap-x-8 gap-y-12 px-24 py-20">
          {GIFTS.map((gift) => (
            <ChipButton key={gift} label={gift} onClick={() => handleGiftClick(gift)} selected={gifts.includes(gift)} />
          ))}
        </div>
        <BottomSheet.Button onClick={handleGiftSubmit} />
      </div>
    </BottomSheet.Frame>
  );
};

export default GiftsBottomSheet;

const GIFTS = ["컵/컵홀더", "포스터", "포토카드", "포토굿즈", "엽서", "스티커", "키링", "기타"] as const;
