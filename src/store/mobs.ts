import { create } from "zustand";
import { type Mob } from "../types/mob";
import { useRunesStore } from "./runes";
import { MOB_ID } from "../lib/mob.mapping";
import { persist, createJSONStorage } from "zustand/middleware";

type StoreType = {
  mobs: Mob[];
  addMobs: (mobs: Mob[]) => void;
  removeMobs: (mobsIds: number[]) => void;
  resetMobs: () => void;

  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
};

export const useMobsStore = create(
  persist<StoreType>(
    (set) => ({
      mobs: [],
      addMobs: (mobs) => {
        set((state) => ({
          mobs: [...state.mobs, ...mobs],
        }));

        const { addRunes, setOccupiedNameToRunes } = useRunesStore.getState();

        for (const mob of mobs.filter((mob) => mob.runes.length > 0)) {
          addRunes(mob.runes);
          setOccupiedNameToRunes(mob.runes, MOB_ID[mob.unit_master_id]);
        }
      },
      removeMobs: (mobsIds) =>
        set((state) => ({
          mobs: state.mobs.filter((rune) => !mobsIds.includes(rune.unit_id)),
        })),
      resetMobs: () =>
        set(() => ({
          mobs: [],
        })),

      _hasHydrated: false,
      setHasHydrated: (state) => {
        set({
          _hasHydrated: state,
        });
      },
    }),
    {
      name: "mobs-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
