export const SETS = {
  1: "Energy",
  2: "Guard",
  3: "Swift",
  4: "Blade",
  5: "Rage",
  6: "Focus",
  7: "Endure",
  8: "Fatal",
  10: "Despair",
  11: "Vampire",
  13: "Violent",
  14: "Nemesis",
  15: "Will",
  16: "Shield",
  17: "Revenge",
  18: "Destroy",
  19: "Fight",
  20: "Determination",
  21: "Enhance",
  22: "Accuracy",
  23: "Tolerance",
  24: "Seal",
  25: "Intangible",
  99: "Immemorial",
};
export type SetId = keyof typeof SETS;

export const EFFECTS = {
  1: "HP flat",
  2: "HP %",
  3: "ATK flat",
  4: "ATK %",
  5: "DEF flat",
  6: "DEF %",
  8: "SPD",
  9: "CRIT Rate",
  10: "CRIT Dmg",
  11: "Resistance",
  12: "Accuracy",
};
export type EffectId = keyof typeof EFFECTS;

export const RANKS = {
  0: "Common",
  1: "Magic",
  2: "Rare",
  3: "Hero",
  4: "Legendary",
};
export type RankId = keyof typeof RANKS;

export const QUALITIES = {
  1: "Common",
  2: "Magic",
  3: "Rare",
  4: "Hero",
  5: "Legend",
  // ancient rune qualities
  11: "Common",
  12: "Magic",
  13: "Rare",
  14: "Hero",
  15: "Legend",
};
export type QualityId = keyof typeof QUALITIES;

export const MAX_OF_MAINSTAT = {
  1: {
    // HP
    1: 804,
    2: 1092,
    3: 1380,
    4: 1704,
    5: 2088,
    6: 2448,
  },
  2: {
    // HP %
    1: 18,
    2: 20,
    3: 38,
    4: 43,
    5: 51,
    6: 63,
  },
  3: {
    // ATK
    1: 54,
    2: 74,
    3: 93,
    4: 113,
    5: 135,
    6: 160,
  },
  4: {
    // ATK %
    1: 18,
    2: 20,
    3: 38,
    4: 43,
    5: 51,
    6: 63,
  },
  5: {
    // DEF
    1: 54,
    2: 74,
    3: 93,
    4: 113,
    5: 135,
    6: 160,
  },
  6: {
    // DEF %
    1: 18,
    2: 20,
    3: 38,
    4: 43,
    5: 51,
    6: 63,
  },
  8: {
    // SPD
    1: 18,
    2: 19,
    3: 25,
    4: 30,
    5: 39,
    6: 42,
  },
  9: {
    // CRIT Rate
    1: 18,
    2: 20,
    3: 37,
    4: 41,
    5: 47,
    6: 58,
  },
  10: {
    // CRIT Dmg
    1: 20,
    2: 37,
    3: 43,
    4: 58,
    5: 65,
    6: 80,
  },
  11: {
    // Resistance
    1: 18,
    2: 20,
    3: 38,
    4: 44,
    5: 51,
    6: 64,
  },
  12: {
    // Accuracy
    1: 18,
    2: 20,
    3: 38,
    4: 44,
    5: 51,
    6: 64,
  },
};

export const MAX_OF_SUBSTAT = {
  1: {
    // HP
    1: 300,
    2: 525,
    3: 825,
    4: 1125,
    5: 1500,
    6: 1875,
  },
  2: {
    // HP %
    1: 10,
    2: 15,
    3: 25,
    4: 30,
    5: 35,
    6: 40,
  },
  3: {
    // ATK
    1: 20,
    2: 25,
    3: 40,
    4: 50,
    5: 75,
    6: 100,
  },
  4: {
    // ATK %
    1: 10,
    2: 15,
    3: 25,
    4: 30,
    5: 35,
    6: 40,
  },
  5: {
    // DEF
    1: 20,
    2: 25,
    3: 40,
    4: 50,
    5: 75,
    6: 100,
  },
  6: {
    // DEF %
    1: 10,
    2: 15,
    3: 25,
    4: 30,
    5: 35,
    6: 40,
  },
  8: {
    // SPD
    1: 5,
    2: 10,
    3: 15,
    4: 20,
    5: 25,
    6: 30,
  },
  9: {
    // CRIT Rate
    1: 5,
    2: 10,
    3: 15,
    4: 20,
    5: 25,
    6: 30,
  },
  10: {
    // CRIT Dmg
    1: 10,
    2: 15,
    3: 20,
    4: 25,
    5: 25,
    6: 35,
  },
  11: {
    // Resistance
    1: 10,
    2: 15,
    3: 20,
    4: 25,
    5: 35,
    6: 40,
  },
  12: {
    // Accuracy
    1: 10,
    2: 15,
    3: 20,
    4: 25,
    5: 35,
    6: 40,
  },
};
