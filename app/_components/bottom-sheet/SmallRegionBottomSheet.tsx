import { ButtonHTMLAttributes, ReactNode } from "react";
import { BottomSheetBaseType } from "@/types/index";
import { BIG_REGIONS, SMALL_REGIONS } from "@/constants/regions";
import BottomSheet from "./BottomSheetMaterial";

interface Props extends BottomSheetBaseType {
  bigRegion: (typeof BIG_REGIONS)[number];
  setSmallRegionFilter: (bigRegion: string) => void;
}

const SmallRegionBottomSheet = ({ closeBottomSheet, refs, bigRegion, setSmallRegionFilter }: Props) => {
  return (
    <BottomSheet.Frame closeBottomSheet={closeBottomSheet} ref={refs.sheet}>
      <BottomSheet.Title>시/군/구 선택</BottomSheet.Title>
      <section ref={refs.content} className="grid grid-cols-2 gap-24 p-24">
        <RegionButton
          onClick={() => {
            setSmallRegionFilter("전지역");
            closeBottomSheet();
          }}
        >
          전지역
        </RegionButton>
        {SMALL_REGIONS[bigRegion].map((regions, index) => (
          <RegionButton
            key={index}
            onClick={() => {
              setSmallRegionFilter(regions);
              closeBottomSheet();
            }}
          >
            {regions}
          </RegionButton>
        ))}
      </section>
    </BottomSheet.Frame>
  );
};

export default SmallRegionBottomSheet;

interface RegionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const RegionButton = ({ children, onClick }: RegionButtonProps) => {
  return (
    <button onClick={onClick} className="text-start text-14">
      {children}
    </button>
  );
};
