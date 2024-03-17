import { StatusType } from "@/types/index";

export const STATUS: Record<number, StatusType> = {
  0: "",
  1: "예정",
  2: "진행중",
  3: "종료제외",
  4: "종료",
};

export type StatusKey = keyof typeof STATUS;

export const SORT = ["최신순", "인기순"] as const;

export type SortItem = (typeof SORT)[number];
