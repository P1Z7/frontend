import { create } from "zustand";
import { modalSlice } from "./slice/modalSlice";
import { createModalSlice } from "./slice/modalSlice";
import { createPostSlice, postSlice } from "./slice/postSlice";
import { BottomSheetSlice, createBottomSheetSlice } from "./slice/bottomSheetSlice";

type SliceType = modalSlice & postSlice & BottomSheetSlice;

export const useStore = create<SliceType>()((...a) => ({
  ...createModalSlice(...a),
  ...createPostSlice(...a),
  ...createBottomSheetSlice(...a),
}));
