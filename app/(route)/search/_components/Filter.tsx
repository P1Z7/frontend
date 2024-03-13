"use client";

import { formatDate } from "@/utils/formatString";
import { StatusType } from "@/types/index";
import ResetIcon from "@/public/icon/reset.svg";
import SortIcon from "@/public/icon/sort.svg";
import { FilterType, SortType } from "../_hooks/useSearch";
import FilterButton from "./FilterButton";
import SortButton from "./SortButton";
import StatusButton from "./StatusButton";

interface Props {
  visible: boolean;
  filter: FilterType;
  resetFilter: () => void;
  sort: SortType;
  handleSort: handlerFn;
  status: StatusType;
  handleStatus: handlerFn;
  openSearchBottomSheet: handlerFn;
}

const Filter = ({ visible, filter, resetFilter, sort, handleSort, status, handleStatus, openSearchBottomSheet }: Props) => {
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

  return (
    <div className={`animate-fadeIn flex-col gap-12 px-20 pb-8 pc:p-0 ${visible ? "flex" : "hidden pc:block"}`}>
      <div className="flex w-full gap-8 overflow-auto scrollbar-hide">
        <button onClick={resetFilter} type="button" className="flex-center h-32 w-32 rounded-full bg-gray-50">
          <ResetIcon />
        </button>
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
        <FilterButton onClick={openSearchBottomSheet.event} selected={Boolean(filter.event)}>
          {filter.event || "행사유형"}
        </FilterButton>
        <FilterButton onClick={openSearchBottomSheet.gift} selected={Boolean(filter.gifts.length)}>
          {formattedGift ?? "특전"}
        </FilterButton>
      </div>
      <div className="flex gap-12">
        <StatusButton selected={status === "" || status === "예정"} onClick={handleStatus.upcoming}>
          예정
        </StatusButton>
        <StatusButton selected={status === "" || status === "진행중"} onClick={handleStatus.current}>
          진행중
        </StatusButton>
        <StatusButton selected={status === "종료"} onClick={handleStatus.passed}>
          종료
        </StatusButton>
      </div>
      <div className="flex items-center gap-8">
        <SortIcon />
        <SortButton onClick={handleSort.recent} selected={sort === "최신순"}>
          최신순
        </SortButton>
        <SortButton onClick={handleSort.popular} selected={sort === "인기순"}>
          인기순
        </SortButton>
      </div>
    </div>
  );
};

export default Filter;

type handlerFn = { [fn: string]: () => void };
