import { ButtonHTMLAttributes, ReactNode } from "react";
import { BottomSheetBaseType } from "@/types/index";
import { BIG_REGIONS } from "@/constants/regions";
import BottomSheet from "./BottomSheetMaterial";

interface Props extends BottomSheetBaseType {
  setBigRegionFilter: (bigRegion: (typeof BIG_REGIONS)[number] | "") => void;
}

const BigRegionBottomSheet = ({ closeBottomSheet, refs, setBigRegionFilter }: Props) => {
  return (
    <BottomSheet.Frame closeBottomSheet={closeBottomSheet} ref={refs.sheet}>
      <BottomSheet.Title>시/도 선택</BottomSheet.Title>
      <section ref={refs.content} className="grid grid-cols-2 gap-24 p-24">
        <RegionButton
          onClick={() => {
            setBigRegionFilter("");
            closeBottomSheet();
          }}
        >
          전지역
        </RegionButton>
        {BIG_REGIONS.map((regions, index) => (
          <RegionButton
            key={index}
            onClick={() => {
              setBigRegionFilter(regions);
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
BigRegionBottomSheet.displayName = "BigRegionBottomSheet";

export default BigRegionBottomSheet;

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
