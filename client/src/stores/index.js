import create from "zustand";
import { persist } from "zustand/middleware";

export const useLanguageStore = create(
  persist((set) => ({
    selected: "EN",
    update: (value) => set({ selected: value }),
  }))
);

export const useCurrencyStore = create(
  persist((set) => ({
    selected: "USD",
    update: (value) => set({ selected: value }),
  }))
);
