import { Slide } from "@beamerstream/common";
import { create } from "zustand";

export type State = {
  activeSlide: Slide | null;
  setActiveSlide: (value: Slide) => void;
};

export const useThemeEditorStore = create<State>((set) => ({
  activeSlide: null,
  setActiveSlide: (value: Slide) => set(() => ({ activeSlide: value })),
}));
