import { Post } from "@/(route)/post/page";
import { StateCreator } from "zustand";

export interface PostSlice {
  postInfo: null | Post;
  setPostInfo: (newInfo: Post) => void;
}

export const createPostSlice: StateCreator<PostSlice> = (set) => ({
  postInfo: null,
  setPostInfo: (newInfo) => set((state) => ({ ...state, postInfo: newInfo })),
});
