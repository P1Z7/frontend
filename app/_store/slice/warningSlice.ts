import { StateCreator } from "zustand";

export interface WarningSlice {
  isWarningCheck: boolean;
  setIsWarningCheck: (s: boolean) => void;
}

export const createWarningSlice: StateCreator<WarningSlice> = (set) => ({
  isWarningCheck: false,
  setIsWarningCheck: (s) => set((state) => ({ ...state, isWarningCheck: s })),
});
