import { create } from "zustand";
import { BottomSheetSlice, createBottomSheetSlice } from "./slice/bottomSheetSlice";
import { ModalSlice, createModalSlice } from "./slice/modalSlice";
import { PostSlice, createPostSlice } from "./slice/postSlice";

type SliceType = ModalSlice & PostSlice & BottomSheetSlice;

export const useStore = create<SliceType>()((...a) => ({
  ...createModalSlice(...a),
  ...createPostSlice(...a),
  ...createBottomSheetSlice(...a),
}));
