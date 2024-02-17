import { StateCreator } from "zustand";

export interface WriterSlice {
  writerId: string;
  setWriterId: (id: string) => void;
}

export const createWriterSlice: StateCreator<WriterSlice> = (set) => ({
  writerId: "",
  setWriterId: (id) => set((state) => ({ ...state, writerId: id })),
});
