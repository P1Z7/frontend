import { create } from "zustand";
import { PostSlice, createPostSlice } from "./slice/postSlice";

type SliceType = PostSlice;

export const useStore = create<SliceType>()((...a) => ({
  ...createPostSlice(...a),
}));
