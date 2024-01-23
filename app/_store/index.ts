import { create } from "zustand";
import { modalSlice } from "./slice/modalSlice";
import { createModalSlice } from "./slice/modalSlice";

type SliceType = modalSlice;

export const useStore = create<SliceType>()((...a) => ({
  ...createModalSlice(...a),
}));
