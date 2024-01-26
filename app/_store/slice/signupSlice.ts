import { Post } from "@/(route)/post/page";
import { StateCreator } from "zustand";

export interface SignupSlice {
  signupInfo: null | Post;
  setSignupInfo: (newInfo: Post) => void;
}

export const createSignupSlice: StateCreator<SignupSlice> = (set) => ({
  signupInfo: null,
  setSignupInfo: (newInfo) => set((state) => ({ ...state, signupInfo: newInfo })),
});
