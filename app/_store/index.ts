import { create } from "zustand";
import { BottomSheetSlice, createBottomSheetSlice } from "./slice/bottomSheetSlice";

type SliceType = BottomSheetSlice;

export const useStore = create<SliceType>()((...a) => ({
  ...createBottomSheetSlice(...a),
}));
