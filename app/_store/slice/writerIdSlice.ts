import { StateCreator } from "zustand";

export interface WriterSlice {
  writerId: string;
  setWriterId: (id: string) => void;
  postLoading: boolean;
  setPostLoading: (isLoading: boolean) => void;
}

export const createWriterSlice: StateCreator<WriterSlice> = (set) => ({
  writerId: "",
  setWriterId: (id) => set((state) => ({ ...state, writerId: id })),
  postLoading: false,
  setPostLoading: (isLoading) => set((state) => ({ ...state, postLoading: isLoading })),
});
