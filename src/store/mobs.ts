import { create } from "zustand";
import { type Mob } from "../types/mob";
import { useRunesStore } from "./runes";
import { MOB_ID } from "../lib/mob.mapping";

type StoreType = {
  mobs: Mob[];
  addMobs: (mobs: Mob[]) => void;
  removeMobs: (mobsIds: number[]) => void;
};

export const useMobsStore = create<StoreType>((set) => ({
  mobs: [],
  addMobs: (mobs) => {
    set((state) => ({
      mobs: [...state.mobs, ...mobs],
    }));

    const { addRunes, setOccupiedNameToRunes } = useRunesStore.getState();

    console.log("mobs", mobs);
    for (const mob of mobs.filter((mob) => mob.runes.length > 0)) {
      addRunes(mob.runes);
      setOccupiedNameToRunes(mob.runes, MOB_ID[mob.unit_master_id]);
    }
  },
  removeMobs: (mobsIds) =>
    set((state) => ({
      mobs: state.mobs.filter((rune) => !mobsIds.includes(rune.unit_id)),
    })),
}));
