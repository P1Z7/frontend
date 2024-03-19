import { create } from "zustand";
import { AdminSlice, createAdminSlice } from "./slice/adminSlice";
import { EventHeaderSlice, createEventHeaderSlice } from "./slice/eventHeaderSlice";
import { WarningSlice, createWarningSlice } from "./slice/warningSlice";
import { WriterSlice, createWriterSlice } from "./slice/writerIdSlice";

type SliceType = WarningSlice & EventHeaderSlice & WriterSlice & AdminSlice;

export const useStore = create<SliceType>()((...a) => ({
  ...createWarningSlice(...a),
  ...createEventHeaderSlice(...a),
  ...createWriterSlice(...a),
  ...createAdminSlice(...a),
}));
