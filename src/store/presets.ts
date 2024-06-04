import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { type Preset } from "../lib/preset.mapping";

type StoreType = {
  presets: Preset[];
  addPresets: (presets: Preset[]) => void;
  removePresets: (presetNames: string[]) => void;
  resetPresets: () => void;

  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
};

export const usePresetsStore = create(
  persist<StoreType>(
    (set) => ({
      presets: [],
      addPresets: (presets) =>
        set((state) => ({
          presets: [...state.presets, ...presets],
        })),
      removePresets: (presetsIds) =>
        set((state) => ({
          presets: state.presets.filter(
            (preset) => !presetsIds.includes(preset.name),
          ),
        })),
      resetPresets: () =>
        set(() => ({
          presets: [],
        })),

      _hasHydrated: false,
      setHasHydrated: (state) => {
        set({
          _hasHydrated: state,
        });
      },
    }),
    {
      name: "presets-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
