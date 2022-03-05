import create from "zustand";
import { persist } from "zustand/middleware";

export const useLanguageStore = create(
  persist((set) => ({
    language: "EN",
    setLanguage: (value = "EN") => set({ language: value }),
  }))
);

export const useCurrencyStore = create(
  persist((set) => ({
    currency: { symbol: "USD" },
    setCurrency: (value = "USD") => set({ currency: value }),
  }))
);
