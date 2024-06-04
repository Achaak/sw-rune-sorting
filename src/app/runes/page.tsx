"use client";

import { useFiltersStore } from "../../store/filters";
import { Filter } from "../_components/filter";
import { RuneList } from "../_components/rune-list";

export default function RunePage() {
  const { _hasHydrated } = useFiltersStore();

  return (
    <main className="flex flex-col gap-4 p-4">
      {_hasHydrated && <Filter />}
      <RuneList />
    </main>
  );
}
