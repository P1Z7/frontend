import { create } from "zustand";
import { WarningSlice, createWarningSlice } from "./slice/warningSlice";

type SliceType = WarningSlice;

export const useStore = create<SliceType>()((...a) => ({
  ...createWarningSlice(...a),
}));
