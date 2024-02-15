import { StateCreator } from "zustand";

export interface EventHeaderSlice {
  eventHeader: string;
  setEventHeader: (s: string) => void;
}

export const createEventHeaderSlice: StateCreator<EventHeaderSlice> = (set) => ({
  eventHeader: "",
  setEventHeader: (eventHeader) => set((state) => ({ ...state, eventHeader })),
});
