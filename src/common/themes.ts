import { z } from "zod";
import jsonThemes from "~/utils/themes.json";

export type Theme = keyof typeof jsonThemes;

const keys = Object.keys(jsonThemes);

export const themeSchema = z.enum([
  keys[0] as Theme,
  ...(keys.slice(1) as Theme[]),
]);

export const themes = jsonThemes;
