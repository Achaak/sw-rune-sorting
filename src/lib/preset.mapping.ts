import { z } from "zod";

export const presetSchema = z.object({
  name: z.string(),
  icon: z.string(),
  filters: z.object({
    sets: z.array(z.number()),
    slots: z.array(z.number()),
    minNbStats: z.number(),
    minStatsValues: z.object({
      atk: z.number(),
      atkPercent: z.number(),
      def: z.number(),
      defPercent: z.number(),
      hp: z.number(),
      hpPercent: z.number(),
      critRate: z.number(),
      critDamage: z.number(),
      speed: z.number(),
      resistance: z.number(),
      accuracy: z.number(),
    }),
  }),
});

export type Preset = z.infer<typeof presetSchema>;
