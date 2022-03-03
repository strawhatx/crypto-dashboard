import create from "zustand";
import { persist } from "zustand/middleware";

export const useLanguageStore = create(
  persist((set) => ({
    language: "EN",
    updateLanguage: (value) => set({ language: value }),
  }))
);

export const useCurrencyStore = create(
  persist((set) => ({
    currency: { symbol: "USD" },
    updateCurrency: (value) => set({ currency: value }),
  }))
);
