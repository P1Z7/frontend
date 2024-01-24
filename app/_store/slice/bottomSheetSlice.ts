import { StateCreator } from "zustand";

export interface BottomSheetSlice {
  bottomSheet: string;
  closeBottomSheet: () => void;
  openBottomSheet: (type: string) => void;
}

export const createBottomSheetSlice: StateCreator<BottomSheetSlice> = (set) => ({
  bottomSheet: "",
  closeBottomSheet: () => set((state) => ({ ...state, bottomSheet: "" })),
  openBottomSheet: (type) => set((state) => ({ ...state, bottomSheet: type })),
});
