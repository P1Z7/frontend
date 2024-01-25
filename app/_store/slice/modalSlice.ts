import { StateCreator } from "zustand";

export interface ModalSlice {
  modal: string;
  closeModal: () => void;
  openModal: (type: string) => void;
}

export const createModalSlice: StateCreator<ModalSlice> = (set) => ({
  modal: "",
  closeModal: () => set((state) => ({ ...state, modal: "" })),
  openModal: (type) => set((state) => ({ ...state, modal: type })),
});
