"use client";

import classNames from "classnames";
import { useState } from "react";
import BigRegionBottomSheet from "@/components/bottom-sheet/BigRegionBottomSheet";
import CalenderBottomSheet from "@/components/bottom-sheet/CalendarBottomSheet";
import GiftBottomSheet from "@/components/bottom-sheet/GiftsBottomSheet";
import SmallRegionBottomSheet from "@/components/bottom-sheet/SmallRegionBottomSheet";
import HorizontalEventCard from "@/components/card/HorizontalEventCard";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import { MOCK_EVENTS } from "@/constants/mock";
import { BIG_REGIONS } from "@/constants/regions";

interface FilterType {
  bigRegion: (typeof BIG_REGIONS)[number] | "";
  smallRegion: string;
  startDate: string | null;
  endDate: string | null;
  gifts: string[];
}

const BOTTOM_SHEET = {
  bigRegion: "big-region_bottom-sheet",
  smallRegion: "small-region_bottom-sheet",
  calender: "calender_bottom-sheet",
  gift: "gift_bottom-sheet",
};

const SearchPage = () => {
  const { bottomSheet, openBottomSheet, closeBottomSheet, sheet } = useBottomSheet();
  const [filter, setFilter] = useState<FilterType>({
    bigRegion: "",
    smallRegion: "전지역",
    startDate: null,
    endDate: null,
    gifts: [],
  });

  const setBigRegionFilter = (bigRegion: (typeof BIG_REGIONS)[number] | "") => {
    setFilter((prev) => ({ ...prev, bigRegion }));
    setFilter((prev) => ({ ...prev, smallRegion: "전지역" }));
  };
  const setSmallRegionFilter = (smallRegion: string) => {
    setFilter((prev) => ({ ...prev, smallRegion }));
  };
  const setStartDateFilter = (startDate: string) => {
    setFilter((prev) => ({ ...prev, startDate }));
  };
  const setEndDateFilter = (endDate: string) => {
    setFilter((prev) => ({ ...prev, endDate }));
  };
  const setGiftsFilter = (gift: string) => {
    setFilter((prev) => ({ ...prev, gifts: [...prev.gifts, gift] }));
  };

  const [sort, setSort] = useState<"최신순" | "인기순">("최신순");

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
            <button onClick={() => openBottomSheet(BOTTOM_SHEET.calender)}>기간</button>
            <button onClick={() => openBottomSheet(BOTTOM_SHEET.gift)}>특전</button>
          </div>
          <div className="flex gap-8">
            <button onClick={() => setSort("최신순")} className={classNames({ "text-black": sort === "최신순" })}>
              최신순
            </button>
            <button onClick={() => setSort("인기순")} className={classNames({ "text-black": sort === "인기순" })}>
              인기순
            </button>
          </div>
        </section>
        <section className="flex flex-col items-center">
          {MOCK_EVENTS.map((event, index) => (
            <HorizontalEventCard key={index} data={event} />
          ))}
        </section>
      </main>
      {bottomSheet === BOTTOM_SHEET.bigRegion && <BigRegionBottomSheet closeBottomSheet={closeBottomSheet} setBigRegionFilter={setBigRegionFilter} ref={sheet} />}
      {bottomSheet === BOTTOM_SHEET.smallRegion && (
        <SmallRegionBottomSheet closeBottomSheet={closeBottomSheet} bigRegion={filter.bigRegion as (typeof BIG_REGIONS)[number]} setSmallRegionFilter={setSmallRegionFilter} />
      )}
      {bottomSheet === BOTTOM_SHEET.calender && (
        <CalenderBottomSheet closeBottomSheet={closeBottomSheet} setStartDateFilter={setStartDateFilter} setEndDateFilter={setEndDateFilter} />
      )}
      {bottomSheet === BOTTOM_SHEET.gift && <GiftBottomSheet closeBottomSheet={closeBottomSheet} setGiftsFilter={setGiftsFilter} />}
    </>
  );
};

export default SearchPage;
