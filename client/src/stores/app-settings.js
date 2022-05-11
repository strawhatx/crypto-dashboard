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

export const useModalStore = create((set) => ({
  isCurrenciesOpen: false,
  isLanguagesOpen: false,
  isMobileDrawerOpen: false,

  setIsCurrenciesOpen: (value = false) => set({ isCurrenciesOpen: value }),
  setIsLanguagesOpen: (value = false) => set({ isLanguagesOpen: value }),
  setIsMobileDrawerOpen: (value = false) => set({ isMobileDrawerOpen: value }),
}));

export const useWatchlistStore = create((set, get) => ({
  isAddOpen: false,
  resetNum: 0,

  setIsAddOpen: (value = false) => set({ isAddOpen: value }),
  setResetNum: () => set((state) => ({ resetNum: state.resetNum + 1 })),
}));
