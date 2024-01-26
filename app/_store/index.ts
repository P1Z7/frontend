import { create } from "zustand";
import { BottomSheetSlice, createBottomSheetSlice } from "./slice/bottomSheetSlice";
import { ModalSlice, createModalSlice } from "./slice/modalSlice";
import { PostSlice, createPostSlice } from "./slice/postSlice";
import { SignupSlice, createSignupSlice } from "./slice/signupSlice";

type SliceType = ModalSlice & PostSlice & BottomSheetSlice & SignupSlice;

export const useStore = create<SliceType>()((...a) => ({
  ...createModalSlice(...a),
  ...createPostSlice(...a),
  ...createBottomSheetSlice(...a),
  ...createSignupSlice(...a),
}));
