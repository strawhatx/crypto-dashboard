import create from "zustand";
import { persist } from "zustand/middleware";

export const useLoadingStore = create(
  persist((set) => ({
    isLoading: false,
    pending: 0,

    cancelAll: () => set({ pending: 0, isLoading: false }),
    addRequest: () => set((state) => ({ pending: state.pending + 1 })),
    completeRequest: () => set((state) => ({ pending: state.pending - 1 })),
  }))
);
