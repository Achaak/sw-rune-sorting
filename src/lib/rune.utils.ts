import { type Rune } from "../types/rune";
import { MAX_OF_SUBSTAT } from "./rune.mapping";

export const getRuneEfficiency = (rune: Rune) => {
  let ratio = 0.0;

  // Main stat
  const runeClass = (isAncient(rune) ? rune.class - 10 : rune.class) as
    | 1
    | 2
    | 3
    | 4
    | 5;
  ratio +=
    MAX_OF_SUBSTAT[rune.pri_eff[0]][runeClass] /
    MAX_OF_SUBSTAT[rune.pri_eff[0]][6];

  // Sub stats
  rune.sec_eff.forEach((stat) => {
    const value = stat[3] && stat[3] > 0 ? stat[1] + stat[3] : stat[1];
    ratio += value / MAX_OF_SUBSTAT[stat[0]][6];
  });

  // Innate stat
  if (rune.prefix_eff && rune.prefix_eff[0] > 0) {
    ratio += rune.prefix_eff[1] / MAX_OF_SUBSTAT[rune.prefix_eff[0]][6];
  }

  const efficiency = (ratio / 2.8) * 100;

  return {
    current: ((ratio / 2.8) * 100).toFixed(2),
    max: (
      efficiency +
      ((Math.max(Math.ceil((12 - rune.upgrade_curr) / 3.0), 0) * 0.2) / 2.8) *
        100
    ).toFixed(2),
  };
};

const isAncient = (rune: Rune) => {
  return rune.class > 10;
};
