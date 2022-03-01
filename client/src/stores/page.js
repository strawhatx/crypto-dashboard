import create from "zustand";

export const currenciesPageStore = create((set) => ({
  isLoading: true,
  setLoading: (value) => set({ isLoading: value }),
}));

export const currencyPageStore = create((set) => ({
  isLoading: true,
  setLoading: (value) => set({ isLoading: value }),
}));
