"use client";

import { useRef, type FC } from "react";
import { Button } from "../../components/ui/button";
import { useMobsStore } from "../../store/mobs";
import { useRunesStore } from "../../store/runes";
import { type Mob } from "../../types/mob";
import { type Rune } from "../../types/rune";

export const Header: FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { addRunes, resetRunes } = useRunesStore();
  const { addMobs, resetMobs } = useMobsStore();

  const handleAddData = (files: FileList | null) => {
    if (!files?.length) {
      return;
    }

    const file = files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target?.result;
      if (typeof content === "string") {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const data = JSON.parse(content);

        resetRunes();
        resetMobs();

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        addRunes(data.runes as unknown as Rune[]);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        addMobs(data.unit_list as unknown as Mob[]);
      }
    };

    if (!file) {
      return;
    }
    reader.readAsText(file);
  };

  return (
    <header className="flex w-full items-center justify-between border-b border-border p-4">
      <a href="/">
        <h1 className="text-3xl font-bold">Rune filter</h1>
      </a>

      <ul className="flex items-center gap-4">
        <li>
          <Button
            size="sm"
            onClick={() => {
              if (fileInputRef.current) {
                fileInputRef.current.click();
              }
            }}
          >
            Upload file
          </Button>
          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            accept=".json"
            multiple={false}
            onChange={(e) => {
              handleAddData(e.target.files);
            }}
          />
        </li>
        <li>
          <a href="/runes">Runes</a>
        </li>
        <li>
          <a href="/presets">Presets</a>
        </li>
      </ul>
    </header>
  );
};
