import { create } from "zustand";

export const useDefaultStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),

  slideZoom: 4,
  setSlideZoom: (value: number) => set((state) => ({ slideZoom: value })),
}));
