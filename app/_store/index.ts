import { create } from "zustand";
import { EventHeaderSlice, createEventHeaderSlice } from "./slice/eventHeaderSlice";
import { WarningSlice, createWarningSlice } from "./slice/warningSlice";
import { WriterSlice, createWriterSlice } from "./slice/writerIdSlice";

type SliceType = WarningSlice & EventHeaderSlice & WriterSlice;

export const useStore = create<SliceType>()((...a) => ({
  ...createWarningSlice(...a),
  ...createEventHeaderSlice(...a),
  ...createWriterSlice(...a),
}));
