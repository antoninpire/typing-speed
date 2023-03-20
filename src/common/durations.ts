import type { SelectOption } from "~/components/ui/Select";

export type Duration = 15 | 30 | 45 | 60;

export const durations: Duration[] = [15, 30, 45, 60];

export const durationOptions: SelectOption[] = [
  {
    label: "All Durations",
    value: undefined,
  },
  ...durations.map((d) => ({
    label: `${d}s`,
    value: d.toString(),
  })),
];
