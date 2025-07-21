export const Game = {
  DOTA2: "570",
  CS2: "730",
} as const;

export type Game = (typeof Game)[keyof typeof Game];
