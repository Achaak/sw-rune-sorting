import type { EffectId, QualityId, SetId } from "../lib/rune.mapping";

export type SlotId = 1 | 2 | 3 | 4 | 5 | 6;

export type Rune = {
  rune_id: number;
  wizard_id: number;
  occupied_type: 1 | 2; // 1 = Monster, 2 = Inventory
  occupied_id: number;
  slot_no: SlotId;
  rank: QualityId;
  class: 1 | 2 | 3 | 4 | 5 | 6;
  set_id: SetId;
  upgrade_limit: 15;
  upgrade_curr: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;
  base_value: number;
  sell_value: number;
  pri_eff: [EffectId, number]; // [id, value]
  prefix_eff: [EffectId, number]; // [id, value]
  sec_eff: [EffectId, number, number, number][]; // [id, value, enchanted (0 = false, 1 = true), grind (0 = false, other = grind value)]
};

export type RuneFormatted = Rune & {
  efficiency: {
    current: string;
    max: string;
  };
  all_sec_eff: {
    1?: number;
    2?: number;
    3?: number;
    4?: number;
    5?: number;
    6?: number;
    8?: number;
    9?: number;
    10?: number;
    11?: number;
    12?: number;
  };
  occupied_name?: string;
};
