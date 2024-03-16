import { StateCreator } from "zustand";

export type AdminOptionType = "선택 화면" | "아티스트 요청 목록" | "리뷰 신고 목록" | "이벤트 신고 목록" | "행사 삭제";

export interface AdminSlice {
  isAdminAuth: boolean;
  setIsAdminAuth: (auth: boolean) => void;
  adminOption: AdminOptionType;
  setAdminOption: (selected: AdminOptionType) => void;
}

export const createAdminSlice: StateCreator<AdminSlice> = (set) => ({
  isAdminAuth: false,
  setIsAdminAuth: (auth) => set((state) => ({ ...state, isAdminAuth: auth })),
  adminOption: "선택 화면",
  setAdminOption: (selected) => set((state) => ({ ...state, adminOption: selected })),
});
