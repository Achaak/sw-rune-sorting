import { create } from "zustand";
import type { Rune, RuneFormatted } from "../types/rune";
import { getRuneEfficiency } from "../lib/rune.utils";
import { persist, createJSONStorage } from "zustand/middleware";

type StoreType = {
  runes: RuneFormatted[];
  addRunes: (runes: Rune[]) => void;
  removeRunes: (runesIds: number[]) => void;
  setOccupiedNameToRunes: (runes: Rune[], name: string) => void;
  resetRunes: () => void;

  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
};

export const useRunesStore = create(
  persist<StoreType>(
    (set) => ({
      runes: [],
      addRunes: (runes) =>
        set((state) => ({
          runes: [
            ...state.runes,
            ...runes.map((rune) => ({
              ...rune,
              efficiency: getRuneEfficiency(rune),
              all_sec_eff: rune.sec_eff.reduce(
                (acc, [id, value]) => {
                  acc[id] = value;
                  return acc;
                },
                {} as Record<number, number>,
              ),
            })),
          ],
        })),
      removeRunes: (runesIds) =>
        set((state) => ({
          runes: state.runes.filter((rune) => !runesIds.includes(rune.rune_id)),
        })),
      setOccupiedNameToRunes: (runes, name) =>
        set((state) => ({
          runes: state.runes.map((rune) => {
            if (runes.some((r) => r.rune_id === rune.rune_id)) {
              return {
                ...rune,
                occupied_name: name,
              };
            }
            return rune;
          }),
        })),
      resetRunes: () =>
        set(() => ({
          runes: [],
        })),

      _hasHydrated: false,
      setHasHydrated: (state) => {
        set({
          _hasHydrated: state,
        });
      },
    }),
    {
      name: "runes-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
