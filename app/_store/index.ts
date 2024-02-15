import { create } from "zustand";
import { EventHeaderSlice, createEventHeaderSlice } from "./slice/eventHeaderSlice";
import { WarningSlice, createWarningSlice } from "./slice/warningSlice";

type SliceType = WarningSlice & EventHeaderSlice;

export const useStore = create<SliceType>()((...a) => ({
  ...createWarningSlice(...a),
  ...createEventHeaderSlice(...a),
}));
