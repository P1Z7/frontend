import { create } from "zustand";
import { BottomSheetSlice, createBottomSheetSlice } from "./slice/bottomSheetSlice";
import { PostSlice, createPostSlice } from "./slice/postSlice";
import { SignupSlice, createSignupSlice } from "./slice/signupSlice";

type SliceType = PostSlice & BottomSheetSlice & SignupSlice;

export const useStore = create<SliceType>()((...a) => ({
  ...createPostSlice(...a),
  ...createBottomSheetSlice(...a),
  ...createSignupSlice(...a),
}));
