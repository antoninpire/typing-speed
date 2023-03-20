import { z } from "zod";

export const timeFilterSchema = z.enum([
  "ALL_TIME",
  "THIS_YEAR",
  "THIS_MONTH",
  "TODAY",
]);

export type TimeFilter = z.infer<typeof timeFilterSchema>;

export const timeFilters: TimeFilter[] = [
  "ALL_TIME",
  "THIS_MONTH",
  "THIS_YEAR",
  "TODAY",
];
