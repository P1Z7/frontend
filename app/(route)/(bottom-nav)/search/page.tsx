"use client";

import { keepPreviousData, useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import MetaTag from "@/components/MetaTag";
import HorizontalEventCard from "@/components/card/HorizontalEventCard";
import SearchInput from "@/components/input/SearchInput";
import DottedLayout from "@/components/layout/DottedLayout";
import DeferredSuspense from "@/components/skeleton/DeferredSuspense";
import HorizontalEventCardSkeleton from "@/components/skeleton/HorizontalEventCardSkeleton";
import { instance } from "@/api/api";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { formatDate } from "@/utils/formatString";
import { createQueryString } from "@/utils/handleQueryString";
import { Res_Get_Type } from "@/types/getResType";
import { GiftType } from "@/types/index";
import { TAG } from "@/constants/post";
import { BIG_REGIONS } from "@/constants/regions";
import ResetIcon from "@/public/icon/reset.svg";
import SortIcon from "@/public/icon/sort.svg";
import FilterButton from "./_components/FilterButton";
import SortButton from "./_components/SortButton";

const BigRegionBottomSheet = dynamic(() => import("@/components/bottom-sheet/BigRegionBottomSheet"), { ssr: false });
const CalenderBottomSheet = dynamic(() => import("@/components/bottom-sheet/CalendarBottomSheet"), { ssr: false });
const GiftBottomSheet = dynamic(() => import("@/components/bottom-sheet/GiftsBottomSheet"), { ssr: false });
const SmallRegionBottomSheet = dynamic(() => import("@/components/bottom-sheet/SmallRegionBottomSheet"), { ssr: false });

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

const SORT = ["최신순", "인기순"] as const;

const SIZE = 20;

const SearchPage = () => {
  const { bottomSheet, openBottomSheet, closeBottomSheet, refs } = useBottomSheet();

  const searchParams = useSearchParams();
  const { initialKeyword, initialSort, initialBigRegion, initialSmallRegion, initialStartDate, initialEndDate, initialGifts } = getInitialQuery(searchParams);

  const [keyword, setKeyword] = useState(initialKeyword);
  const [sort, setSort] = useState<(typeof SORT)[number]>(initialSort);
  const [filter, setFilter] = useState<FilterType>({
    bigRegion: initialBigRegion,
    smallRegion: initialSmallRegion,
    startDate: initialStartDate,
    endDate: initialEndDate,
    gifts: initialGifts,
  });

  const setBigRegionFilter = (bigRegion: (typeof BIG_REGIONS)[number] | "") => {
    if (bigRegion === "") {
      setFilter((prev) => ({ ...prev, bigRegion }));
      setFilter((prev) => ({ ...prev, smallRegion: "" }));
      return;
    }
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
    if (filter.gifts.includes(gift)) {
      setFilter((prev) => {
        const newGift = prev.gifts.filter((currGift) => currGift !== gift);
        return { ...prev, gifts: newGift };
      });
    } else {
      setFilter((prev) => ({ ...prev, gifts: [...prev.gifts, gift] }));
    }
  };

  const resetFilter = () => {
    setKeyword("");
    setSort("최신순");
    setFilter({ bigRegion: "", smallRegion: "", startDate: null, endDate: null, gifts: [] });
  };

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

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const newQuery = createQueryString({ keyword, sort, ...filter }, searchParams);
    router.push(pathname + "?" + newQuery);
  }, [keyword, sort, filter]);

  const queryClient = useQueryClient();

  const getEvents = async ({ pageParam = 1 }) => {
    const data: Res_Get_Type["eventSearch"] = await instance.get("/event", {
      size: SIZE,
      page: pageParam,
      sort,
      keyword,
      sido: filter.bigRegion,
      gungu: filter.smallRegion === "전지역" ? "" : filter.smallRegion,
      ...{ startDate: filter.startDate || "" },
      ...{ endDate: filter.endDate || "" },
      tags: filter.gifts.map((gift) => TAG[gift]).join(","),
    });
    return data;
  };

  const {
    data: events,
    fetchNextPage,
    isFetching,
    refetch,
  } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["search"],
    queryFn: getEvents,
    getNextPageParam: (lastPage) => (lastPage.page * SIZE < lastPage.totalCount ? lastPage.page + 1 : null),
    placeholderData: keepPreviousData,
  });

  const containerRef = useInfiniteScroll({
    handleScroll: fetchNextPage,
    deps: [events],
  });

  const isEmpty = events?.pages[0].eventList.length === 0;

  useEffect(() => {
    queryClient.removeQueries({ queryKey: ["search"] });
    refetch();
  }, [searchParams]);

  const [position, setPosition] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [position]);

  const handleScroll = useCallback(() => {
    const moving = window.scrollY;
    setVisible(position < 100 || position > moving);
    setPosition(moving);
  }, [position]);

  return (
    <>
      <MetaTag
        title={keyword ? `${keyword}: 검색 결과` : "행사 둘러보기"}
        description={keyword ? `${keyword}의 Opener 행사 검색 결과입니다.` : "Opener에 등록된 각종 오프라인 행사들을 구경해 보세요."}
      />
      <DottedLayout size="wide">
        <main className="relative w-full px-20 pb-84 pt-160 pc:p-0 pc:pb-84">
          <section className="fixed left-0 right-0 top-0 z-nav flex w-full flex-col bg-white-black text-14 text-gray-500 shadow-top pc:static pc:shadow-none">
            <div className="bg-white-black px-20 pb-8 pt-40 pc:px-0 pc:pb-20 pc:pt-[7rem]">
              <SearchInput keyword={keyword} setKeyword={setKeyword} initialKeyword={initialKeyword} placeholder="최애의 이름으로 행사를 찾아보세요!" />
            </div>
            <div className={`animate-fadeIn px-20 pb-8 pc:p-0 ${visible ? "block" : "hidden pc:block"}`}>
              <div className="flex gap-4 pb-12 pc:pb-32">
                <FilterButton onClick={() => openBottomSheet(BOTTOM_SHEET.bigRegion)} selected={Boolean(filter.bigRegion)}>
                  {filter.bigRegion || "시/도"}
                </FilterButton>
                {filter.bigRegion && (
                  <FilterButton onClick={() => openBottomSheet(BOTTOM_SHEET.smallRegion)} selected={Boolean(filter.smallRegion)}>
                    {filter.smallRegion}
                  </FilterButton>
                )}
                <FilterButton onClick={() => openBottomSheet(BOTTOM_SHEET.calender)} selected={Boolean(filter.startDate)}>
                  {formattedDate ?? "기간"}
                </FilterButton>
                <FilterButton onClick={() => openBottomSheet(BOTTOM_SHEET.gift)} selected={Boolean(filter.gifts.length)}>
                  {formattedGift ?? "특전"}
                </FilterButton>
              </div>
              <div className="flex items-center gap-8">
                <SortIcon />
                <SortButton onClick={() => setSort("최신순")} selected={sort === "최신순"}>
                  최신순
                </SortButton>
                <SortButton onClick={() => setSort("인기순")} selected={sort === "인기순"}>
                  인기순
                </SortButton>
                <button onClick={resetFilter} type="button" className="ml-auto flex gap-[0.3rem] text-14 text-gray-400">
                  초기화
                  <ResetIcon />
                </button>
              </div>
            </div>
          </section>
          <section className="flex flex-wrap items-center gap-x-24">
            {isEmpty ? (
              <div className="flex-center w-full pt-36 text-14 font-500">검색 결과가 없습니다.</div>
            ) : (
              events?.pages.map((page) => page.eventList.map((event) => <HorizontalEventCard key={event.id} data={event} />))
            )}
            {/* <DeferredSuspense fallback={<HorizontalEventCardSkeleton />} isFetching={isFetching} /> */}
            <div ref={containerRef} className="h-20 w-full" />
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
      </DottedLayout>
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

const getInitialQuery = (searchParams: ReadonlyURLSearchParams) => {
  const initialKeyword = searchParams.get("keyword") ?? "";
  const initialSort = (SORT as ReadonlyArray<string>).includes(searchParams.get("sort") ?? "") ? (searchParams.get("sort") as (typeof SORT)[number]) : SORT[0];
  const initialBigRegion = (BIG_REGIONS as ReadonlyArray<string>).includes(searchParams.get("bigRegion") ?? "")
    ? (searchParams.get("bigRegion") as (typeof BIG_REGIONS)[number] | "")
    : "";
  const initialSmallRegion = searchParams.get("smallRegion") ?? "";
  const initialStartDate = searchParams.get("startDate");
  const initialEndDate = searchParams.get("endDate");
  const initialGifts = (searchParams.get("gifts")?.split("|") as GiftType[]) ?? [];

  return { initialKeyword, initialSort, initialBigRegion, initialSmallRegion, initialStartDate, initialEndDate, initialGifts };
};
