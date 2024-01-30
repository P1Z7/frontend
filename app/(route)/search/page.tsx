"use client";

import { useState } from "react";
import BigRegionBottomSheet from "@/components/bottom-sheet/BigRegionBottomSheet";
import SmallRegionBottomSheet from "@/components/bottom-sheet/SmallRegionBottomSheet";
import HorizontalEventCard from "@/components/card/HorizontalEventCard";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import { BIG_REGIONS } from "@/constants/regions";

const MOCK_EVENTS = [
  {
    placeName: "스타벅스",
    eventType: "카페",
    artistName: "민지",
    startDate: "2024-01-29",
    endDate: "2024-01-30",
    address: "중구",
    gifts: ["포토카드", "엽서"],
  },
  {
    placeName: "강남역",
    eventType: "팬광고",
    artistName: "하니",
    startDate: "2024-01-29",
    endDate: "2024-01-30",
    address: "강남구",
    gifts: ["포토카드", "엽서"],
  },
];

interface FilterType {
  bigRegion: (typeof BIG_REGIONS)[number] | "";
  smallRegion: string;
  gifts: string;
}

const BOTTOM_SHEET = {
  bigRegion: "big-region_bottom-sheet",
  smallRegion: "small-region_bottom-sheet",
};

const SearchPage = () => {
  const { bottomSheet, openBottomSheet, closeBottomSheet } = useBottomSheet();
  const [filter, setFilter] = useState<FilterType>({
    bigRegion: "",
    smallRegion: "전지역",
    gifts: "",
  });

  const setBigRegionFilter = (bigRegion: (typeof BIG_REGIONS)[number] | "") => {
    setFilter((prev) => ({ ...prev, bigRegion }));
    setFilter((prev) => ({ ...prev, smallRegion: "전지역" }));
  };
  const setSmallRegionFilter = (smallRegion: string) => {
    setFilter((prev) => ({ ...prev, smallRegion }));
  };

  return (
    <>
      <main className="w-full px-20 pt-40">
        <div className="relative">
          <input placeholder="최애의 행사를 찾아보세요!" className="h-44 w-full rounded-full bg-gray-200 px-12 text-16 font-400 outline-none" />
        </div>
        <section className="flex flex-col gap-20 text-14 text-gray-500">
          <div className={"flex gap-8"}>
            <button onClick={() => openBottomSheet(BOTTOM_SHEET.bigRegion)} className={filter.bigRegion && "text-black"}>
              {filter.bigRegion || "시/도"}
            </button>
            {filter.bigRegion && (
              <button onClick={() => openBottomSheet(BOTTOM_SHEET.smallRegion)} className={filter.smallRegion && "text-black"}>
                {filter.smallRegion}
              </button>
            )}
            <button>기간</button>
            <button>특전</button>
          </div>
          <div className="flex gap-8">
            <button>최신순</button>
            <button>인기순</button>
          </div>
        </section>
        <section>
          {MOCK_EVENTS.map((event, index) => (
            <HorizontalEventCard key={index} data={event} />
          ))}
        </section>
      </main>
      {bottomSheet === BOTTOM_SHEET.bigRegion && <BigRegionBottomSheet closeBottomSheet={closeBottomSheet} setBigRegionFilter={setBigRegionFilter} />}
      {bottomSheet === BOTTOM_SHEET.smallRegion && (
        <SmallRegionBottomSheet closeBottomSheet={closeBottomSheet} bigRegion={filter.bigRegion as (typeof BIG_REGIONS)[number]} setSmallRegionFilter={setSmallRegionFilter} />
      )}
    </>
  );
};

export default SearchPage;
