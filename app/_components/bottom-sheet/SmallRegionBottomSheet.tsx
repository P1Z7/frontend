import { ButtonHTMLAttributes, ReactNode } from "react";
import { BIG_REGIONS, SMALL_REGIONS } from "@/constants/regions";
import BottomSheetFrame from "./BottomSheetFrame";

interface Props {
  closeBottomSheet: () => void;
  bigRegion: (typeof BIG_REGIONS)[number];
  setSmallRegionFilter: (bigRegion: string) => void;
}

const SmallRegionBottomSheet = ({ closeBottomSheet, bigRegion, setSmallRegionFilter }: Props) => {
  return (
    <BottomSheetFrame closeBottomSheet={closeBottomSheet}>
      <h1 className="px-20 text-start text-14">시/군/구 선택</h1>
      <section className="grid grid-cols-2 gap-24 p-24">
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
    </BottomSheetFrame>
  );
};

export default SmallRegionBottomSheet;

interface RegionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const RegionButton = ({ children, onClick }: RegionButtonProps) => {
  return (
    <button onClick={onClick} className="text-start text-16">
      {children}
    </button>
  );
};
