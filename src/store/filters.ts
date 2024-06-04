import { create } from "zustand";
import { type Filters } from "../types/filters";
import { persist, createJSONStorage } from "zustand/middleware";

type StoreType = {
  filters: Filters;
  updateFilters: (filters: Filters) => void;

  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
};

export const useFiltersStore = create(
  persist<StoreType>(
    (set) => ({
      filters: {
        slots: [],
        sets: [],
      },
      updateFilters: (filters) =>
        set(() => ({
          filters,
        })),

      _hasHydrated: false,
      setHasHydrated: (state) => {
        set({
          _hasHydrated: state,
        });
      },
    }),
    {
      name: "filters-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
