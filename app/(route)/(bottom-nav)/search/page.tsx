"use client";

import { ButtonHTMLAttributes, ReactNode, useState } from "react";
import BigRegionBottomSheet from "@/components/bottom-sheet/BigRegionBottomSheet";
import CalenderBottomSheet from "@/components/bottom-sheet/CalendarBottomSheet";
import GiftBottomSheet from "@/components/bottom-sheet/GiftsBottomSheet";
import SmallRegionBottomSheet from "@/components/bottom-sheet/SmallRegionBottomSheet";
import HorizontalEventCard from "@/components/card/HorizontalEventCard";
import SearchInput from "@/components/input/SearchInput";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import { GiftType } from "@/types/index";
import { MOCK_EVENTS } from "@/constants/mock";
import { BIG_REGIONS } from "@/constants/regions";
import DownArrowIcon from "@/public/icon/arrow-down_sm.svg";
import SortIcon from "@/public/icon/sort.svg";

interface FilterType {
  bigRegion: (typeof BIG_REGIONS)[number] | "";
  smallRegion: string;
  startDate: string | null;
  endDate: string | null;
  gifts: GiftType[];
}

const BOTTOM_SHEET = {
  bigRegion: "big-region_bottom-sheet",
  smallRegion: "small-region_bottom-sheet",
  calender: "calender_bottom-sheet",
  gift: "gift_bottom-sheet",
};

const SearchPage = () => {
  const [keyword, setKeyword] = useState("");

  const { bottomSheet, openBottomSheet, closeBottomSheet, refs } = useBottomSheet();
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
  const setGiftsFilter = (gift: GiftType) => {
    setFilter((prev) => ({ ...prev, gifts: [...prev.gifts, gift] }));
  };

  const [sort, setSort] = useState<"최신순" | "인기순">("최신순");

  return (
    <>
      <main className="w-full px-20 pb-100 pt-40">
        <SearchInput setKeyword={setKeyword} placeholder="최애의 행사를 찾아보세요!" />
        <section className="flex flex-col gap-20 pt-8 text-14 text-gray-500">
          <div className="flex gap-4">
            <FilterButton onClick={() => openBottomSheet(BOTTOM_SHEET.bigRegion)} selected={Boolean(filter.bigRegion)}>
              {filter.bigRegion || "시/도"}
            </FilterButton>
            {filter.bigRegion && (
              <FilterButton onClick={() => openBottomSheet(BOTTOM_SHEET.smallRegion)} selected={Boolean(filter.smallRegion)}>
                {filter.smallRegion}
              </FilterButton>
            )}
            <FilterButton onClick={() => openBottomSheet(BOTTOM_SHEET.calender)} selected={Boolean(filter.startDate)}>
              기간
            </FilterButton>
            <FilterButton onClick={() => openBottomSheet(BOTTOM_SHEET.gift)} selected={Boolean(filter.gifts.length)}>
              특전
            </FilterButton>
          </div>
          <div className="flex gap-8">
            <SortIcon />
            <SortButton onClick={() => setSort("최신순")} selected={sort === "최신순"}>
              최신순
            </SortButton>
            <SortButton onClick={() => setSort("인기순")} selected={sort === "인기순"}>
              인기순
            </SortButton>
          </div>
        </section>
        <section className="flex flex-col items-center">
          {MOCK_EVENTS.map((event, index) => (
            <HorizontalEventCard key={index} data={event} />
          ))}
        </section>
      </main>
      {bottomSheet === BOTTOM_SHEET.bigRegion && <BigRegionBottomSheet closeBottomSheet={closeBottomSheet} refs={refs} setBigRegionFilter={setBigRegionFilter} />}
      {bottomSheet === BOTTOM_SHEET.smallRegion && (
        <SmallRegionBottomSheet
          closeBottomSheet={closeBottomSheet}
          refs={refs}
          bigRegion={filter.bigRegion as (typeof BIG_REGIONS)[number]}
          setSmallRegionFilter={setSmallRegionFilter}
        />
      )}
      {bottomSheet === BOTTOM_SHEET.calender && (
        <CalenderBottomSheet closeBottomSheet={closeBottomSheet} refs={refs} setStartDateFilter={setStartDateFilter} setEndDateFilter={setEndDateFilter} />
      )}
      {bottomSheet === BOTTOM_SHEET.gift && <GiftBottomSheet refs={refs} closeBottomSheet={closeBottomSheet} setGiftsFilter={setGiftsFilter} selected={filter.gifts} />}
    </>
  );
};

export default SearchPage;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  selected: boolean;
}

const FilterButton = ({ children, onClick, selected }: ButtonProps) => {
  return (
    <button onClick={onClick} className={`flex-center h-28 shrink-0 gap-4 px-8 text-14 font-500 ${selected ? "text-gray-700" : "text-gray-400"}`}>
      {children}
      <DownArrowIcon stroke={selected ? "#494F5A" : "#A0A5B1"} width="20" height="20" viewBox="0 0 24 24" />
    </button>
  );
};

const SortButton = ({ children, onClick, selected }: ButtonProps) => {
  return (
    <button onClick={onClick} className={`h-20 shrink-0 text-14 font-500 ${selected ? "text-gray-900" : "text-gray-400"}`}>
      {children}
    </button>
  );
};
