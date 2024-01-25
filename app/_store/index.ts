import { create } from "zustand";
import { BottomSheetSlice, createBottomSheetSlice } from "./slice/bottomSheetSlice";
import { PostSlice, createPostSlice } from "./slice/postSlice";

type SliceType = PostSlice & BottomSheetSlice;

export const useStore = create<SliceType>()((...a) => ({
  ...createPostSlice(...a),
  ...createBottomSheetSlice(...a),
}));
