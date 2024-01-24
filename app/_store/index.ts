import { create } from "zustand";
import { modalSlice } from "./slice/modalSlice";
import { createModalSlice } from "./slice/modalSlice";
import { createPostSlice, postSlice } from "./slice/postSlice";

type SliceType = modalSlice & postSlice;

export const useStore = create<SliceType>()((...a) => ({
  ...createModalSlice(...a),
  ...createPostSlice(...a),
}));
