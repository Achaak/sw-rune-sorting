"use client";

import { useRef } from "react";
import { Button } from "../../components/ui/button";
import { usePresetsStore } from "../../store/presets";
import { useToast } from "../../components/ui/use-toast";
import { z } from "zod";
import { presetSchema } from "../../lib/preset.mapping";

export default function PresetsPage() {
  const { presets, addPresets, resetPresets } = usePresetsStore();
  const importInputRef = useRef<HTMLInputElement | null>(null);
  const { toast } = useToast();

  const handleImportData = (files: FileList | null) => {
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

        if (!z.array(presetSchema).safeParse(data).success) {
          toast({
            title: "Invalid data",
            description: "The data you are trying to import is not valid.",
            variant: "destructive",
          });
          return;
        }

        resetPresets();

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        addPresets(data);
      }
    };

    if (!file) {
      return;
    }
    reader.readAsText(file);
  };

  return (
    <main className="p-4">
      <Button
        onClick={() => {
          if (importInputRef.current) {
            importInputRef.current.click();
          }
        }}
      >
        Import presets
      </Button>
      <input
        ref={importInputRef}
        type="file"
        className="hidden"
        onChange={(e) => handleImportData(e.target.files)}
        multiple={false}
        accept=".json"
      />
      <Button
        onClick={() => {
          const blob = new Blob([JSON.stringify(presets)], {
            type: "application/json",
          });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = "presets.json";
          link.click();
          URL.revokeObjectURL(url);
        }}
      >
        Export presets
      </Button>
    </main>
  );
}
