import { StateCreator } from "zustand";

export interface modalSlice {
  modal: string;
  closeModal: () => void;
  openModal: (type: string) => void;
}

export const createModalSlice: StateCreator<modalSlice> = (set) => ({
  modal: "",
  closeModal: () => set((state) => ({ ...state, modal: "" })),
  openModal: (type) => set((state) => ({ ...state, modal: type })),
});
