import create from "zustand";

export const useLanguageStore = create((set) => ({
  selected: "EN",
  update: (value) => set({ selected: value }),
}));

export const useCurrencyStore = create((set) => ({
  selected: "USD",
  update: (value) => set({ selected: value }),
}));
