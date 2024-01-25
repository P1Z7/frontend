import { Post } from "@/(route)/post/page";
import { StateCreator } from "zustand";

export interface PostSlice {
  step: number;
  setStep: (next: number) => void;
  postInfo: null | Post;
  setPostInfo: (newInfo: Post) => void;
}

export const createPostSlice: StateCreator<PostSlice> = (set) => ({
  step: 1,
  setStep: (next) => set((state) => ({ ...state, step: next })),
  postInfo: null,
  setPostInfo: (newInfo) => set((state) => ({ ...state, postInfo: newInfo })),
});
