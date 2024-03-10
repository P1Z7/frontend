"use client";

import { Suspense } from "react";
import MetaTag from "@/components/MetaTag";
import HorizontalEventCard from "@/components/card/HorizontalEventCard";
import SearchInput from "@/components/input/SearchInput";
import DottedLayout from "@/components/layout/DottedLayout";
import { formatDate } from "@/utils/formatString";
import ResetIcon from "@/public/icon/reset.svg";
import SortIcon from "@/public/icon/sort.svg";
import FilterButton from "./_components/FilterButton";
import SortButton from "./_components/SortButton";
import useFetch from "./_hooks/useFetch";
import useSearch from "./_hooks/useSearch";
import useShowOnScroll from "./_hooks/useShowOnScroll";

const SearchPage = () => {
  const { keyword, setKeyword, sort, handleSort, filter, resetFilter, SearchBottomSheet, openSearchBottomSheet } = useSearch();
  const { events, containerRef } = useFetch({ keyword, sort, filter });
  const visible = useShowOnScroll();

  const formatGift = (gifts: string[]) => {
    if (gifts.length === 0) {
      return;
    }
    if (gifts.length === 1) {
      return gifts[0];
    }
    return gifts[0] + "...";
  };
  const formattedDate = formatDate(filter.startDate, filter.endDate);
  const formattedGift = formatGift(filter.gifts);

  const isEmpty = events?.pages[0].eventList.length === 0;

  return (
    <>
      <MetaTag
        title={keyword ? `${keyword}: 검색 결과` : "행사 둘러보기"}
        description={keyword ? `${keyword}의 Opener 행사 검색 결과입니다.` : "Opener에 등록된 각종 오프라인 행사들을 구경해 보세요."}
      />
      <DottedLayout size="wide">
        <main className={`relative w-full pb-84 [overflow-anchor:none] ${visible ? "" : "pt-72 pc:pt-0"}`}>
          <section className="sticky left-0 right-0 top-72 z-nav flex w-full flex-col bg-white-black text-14 text-gray-500 shadow-top pc:static pc:shadow-none">
            <div className="bg-white-black px-20 pb-8 pt-16 pc:px-0 pc:pb-20 pc:pt-[7rem]">
              <SearchInput keyword={keyword} setKeyword={setKeyword} initialKeyword={keyword} placeholder="최애의 이름으로 행사를 찾아보세요!" />
            </div>
            <div className={`animate-fadeIn px-20 pb-8 pc:p-0 ${visible ? "block" : "hidden pc:block"}`}>
              <div className="flex gap-4 pb-12 pc:pb-32">
                <FilterButton onClick={openSearchBottomSheet.bigRegion} selected={Boolean(filter.bigRegion)}>
                  {filter.bigRegion || "시/도"}
                </FilterButton>
                {filter.bigRegion && (
                  <FilterButton onClick={openSearchBottomSheet.smallRegion} selected={Boolean(filter.smallRegion)}>
                    {filter.smallRegion}
                  </FilterButton>
                )}
                <FilterButton onClick={openSearchBottomSheet.calender} selected={Boolean(filter.startDate)}>
                  {formattedDate ?? "기간"}
                </FilterButton>
                <FilterButton onClick={openSearchBottomSheet.gift} selected={Boolean(filter.gifts.length)}>
                  {formattedGift ?? "특전"}
                </FilterButton>
              </div>
              <div className="flex items-center gap-8">
                <SortIcon />
                <SortButton onClick={handleSort.recent} selected={sort === "최신순"}>
                  최신순
                </SortButton>
                <SortButton onClick={handleSort.popular} selected={sort === "인기순"}>
                  인기순
                </SortButton>
                <button onClick={resetFilter} type="button" className="ml-auto flex gap-[0.3rem] text-14 text-gray-400">
                  초기화
                  <ResetIcon />
                </button>
              </div>
            </div>
          </section>
          <section className="flex flex-wrap items-center gap-x-24 px-20 pc:px-0">
            {isEmpty ? (
              <div className="flex-center w-full pt-36 text-14 font-500">검색 결과가 없습니다.</div>
            ) : (
              <>
                {events?.pages[0].totalCount && (
                  <div className="w-full pt-12 text-12 font-500 text-gray-800 pc:pt-[2.2rem] pc:text-14">{events?.pages[0].totalCount}개의 검색결과가 있습니다.</div>
                )}
                {events?.pages.map((page) => page.eventList.map((event) => <HorizontalEventCard key={event.id} data={event} />))}
              </>
            )}
            <div ref={containerRef} className="h-20 w-full" />
          </section>
        </main>
      </DottedLayout>
      <SearchBottomSheet />
    </>
  );
};

const SuspenseSearchPage = () => {
  return (
    <Suspense>
      <SearchPage />
    </Suspense>
  );
};

export default SuspenseSearchPage;
