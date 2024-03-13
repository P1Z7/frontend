import dynamic from "next/dynamic";
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { EVENTS } from "@/components/bottom-sheet/EventBottomSheet";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import { createQueryString } from "@/utils/handleQueryString";
import { EventType, GiftType, StatusType } from "@/types/index";
import { BIG_REGIONS } from "@/constants/regions";

const BigRegionBottomSheet = dynamic(() => import("@/components/bottom-sheet/BigRegionBottomSheet"), { ssr: false });
const SmallRegionBottomSheet = dynamic(() => import("@/components/bottom-sheet/SmallRegionBottomSheet"), { ssr: false });
const CalenderBottomSheet = dynamic(() => import("@/components/bottom-sheet/CalendarBottomSheet"), { ssr: false });
const GiftBottomSheet = dynamic(() => import("@/components/bottom-sheet/GiftsBottomSheet"), { ssr: false });
const EventBottomSheet = dynamic(() => import("@/components/bottom-sheet/EventBottomSheet"), { ssr: false });

const useSearch = () => {
  const searchParams = useSearchParams();
  const initialValue = getInitialQuery(searchParams);

  const [keyword, setKeyword] = useState(initialValue.keyword);
  const [sort, setSort] = useState<SortType>(initialValue.sort);
  const [status, setStatus] = useState<StatusType>(initialValue.status);

  const handleSort = {
    recent: () => {
      setSort("최신순");
    },
    popular: () => {
      setSort("인기순");
    },
  };

  const handleStatus = {
    upcoming: () => {
      if (status === "") {
        setStatus("진행중");
        return;
      }
      if (status === "진행중") {
        setStatus("");
        return;
      }
      setStatus("예정");
    },
    current: () => {
      if (status === "") {
        setStatus("예정");
        return;
      }
      if (status === "예정") {
        setStatus("");
        return;
      }
      setStatus("진행중");
    },
    passed: () => {
      setStatus("종료");
    },
  };

  const [filter, setFilter] = useState<FilterType>({
    bigRegion: initialValue.bigRegion,
    smallRegion: initialValue.smallRegion,
    startDate: initialValue.startDate,
    endDate: initialValue.endDate,
    event: initialValue.event,
    gifts: initialValue.gifts,
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
  const setEventFilter = (event: EventType | "") => {
    setFilter((prev) => ({ ...prev, event }));
  };
  const setGiftsFilter = (gifts: GiftType[]) => {
    setFilter((prev) => ({ ...prev, gifts }));
  };

  const resetFilter = () => {
    setKeyword("");
    setSort("최신순");
    setStatus("");
    setFilter({ bigRegion: "", smallRegion: "", startDate: null, endDate: null, event: "", gifts: [] });
  };

  const { bottomSheet, openBottomSheet, closeBottomSheet, refs } = useBottomSheet();

  const openSearchBottomSheet = {
    bigRegion: () => {
      openBottomSheet(BOTTOM_SHEET.bigRegion);
    },
    smallRegion: () => {
      openBottomSheet(BOTTOM_SHEET.smallRegion);
    },
    calender: () => {
      openBottomSheet(BOTTOM_SHEET.calender);
    },
    event: () => {
      openBottomSheet(BOTTOM_SHEET.event);
    },
    gift: () => {
      openBottomSheet(BOTTOM_SHEET.gift);
    },
  };

  const SearchBottomSheet = () => {
    return (
      <>
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
        {bottomSheet === BOTTOM_SHEET.event && <EventBottomSheet closeBottomSheet={closeBottomSheet} refs={refs} setEventFilter={setEventFilter} selected={filter.event} />}
        {bottomSheet === BOTTOM_SHEET.gift && <GiftBottomSheet refs={refs} closeBottomSheet={closeBottomSheet} setGiftsFilter={setGiftsFilter} initialGift={filter.gifts} />}
      </>
    );
  };

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const initialValue = getInitialQuery(searchParams);
    setKeyword(initialValue.keyword);
    setSort(initialValue.sort);
    setStatus(initialValue.status);
    setFilter({
      bigRegion: initialValue.bigRegion,
      smallRegion: initialValue.smallRegion,
      startDate: initialValue.startDate,
      endDate: initialValue.endDate,
      gifts: initialValue.gifts,
      event: initialValue.event,
    });
  }, [searchParams]);

  useEffect(() => {
    const newQuery = createQueryString({ keyword, sort, status, ...filter }, searchParams);
    router.push(pathname + "?" + newQuery);
  }, [keyword, sort, status, filter]);

  return { keyword, setKeyword, sort, handleSort, status, handleStatus, filter, resetFilter, openSearchBottomSheet, SearchBottomSheet };
};

export default useSearch;

export type SortType = "최신순" | "인기순";

export interface FilterType {
  bigRegion: (typeof BIG_REGIONS)[number] | "";
  smallRegion: string;
  startDate: string | null;
  endDate: string | null;
  event: EventType | "";
  gifts: GiftType[];
}

const SORT = ["최신순", "인기순"] as const;

const STATUS = ["", "예정", "진행중", "종료"] as const;

const BOTTOM_SHEET = {
  bigRegion: "big-region_bottom-sheet",
  smallRegion: "small-region_bottom-sheet",
  calender: "calender_bottom-sheet",
  event: "event_bottom-sheet",
  gift: "gift_bottom-sheet",
};

const getInitialQuery = (searchParams: ReadonlyURLSearchParams) => {
  const keyword = searchParams.get("keyword") ?? "";
  const sort = (SORT as ReadonlyArray<string>).includes(searchParams.get("sort") ?? "") ? searchParams.get("sort") : SORT[0];
  const status = (STATUS as ReadonlyArray<string>).includes(searchParams.get("status") ?? "null") ? searchParams.get("status") : STATUS[0];
  const bigRegion = (BIG_REGIONS as ReadonlyArray<string>).includes(searchParams.get("bigRegion") ?? "") ? searchParams.get("bigRegion") : "";
  const smallRegion = searchParams.get("smallRegion") ?? "";
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const event = (EVENTS as ReadonlyArray<string>).includes(searchParams.get("event") ?? "") ? searchParams.get("event") : "";
  const gifts = searchParams.get("gifts")?.split("|") ?? [];

  return { keyword, sort, status, bigRegion, smallRegion, startDate, endDate, event, gifts } as {
    keyword: string;
    sort: SortType;
    status: StatusType;
    bigRegion: (typeof BIG_REGIONS)[number] | "";
    smallRegion: string;
    startDate: string;
    endDate: string;
    event: EventType | "";
    gifts: GiftType[];
  };
};
