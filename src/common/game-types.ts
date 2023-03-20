import { z } from "zod";
import type { SelectOption } from "~/components/ui/Select";
import { capitalizeFirstCharacter } from "~/utils/capitalize-first-character";

export const gameTypeSchema = z.enum([
  "lowercase",
  "normal",
  "numbers",
  "alpha",
  "alphanumeric",
  "programming",
  "color",
  "drink",
  "movie",
  "music-genre",
  "animal",
]);

export type GameType = z.infer<typeof gameTypeSchema>;

export const gameTypes: GameType[] = [
  "normal",
  "lowercase",
  "numbers",
  "alpha",
  "alphanumeric",
  "programming",
  "color",
  "drink",
  "movie",
  "music-genre",
  "animal",
];

export const gameTypeOptions: SelectOption[] = [
  { label: "All Types", value: undefined },
  ...gameTypes.map((gt) => ({
    label: capitalizeFirstCharacter(gt),
    value: gt,
  })),
];
