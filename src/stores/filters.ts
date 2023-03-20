import { create } from "zustand";
import type { Duration } from "~/common/durations";
import type { GameType } from "~/common/game-types";
import type { TimeFilter } from "~/common/time-filters";

type TFilterLeaderboard = {
  time: TimeFilter;
  gameType?: GameType;
  duration?: Duration;
};

type TFilterProfile = {
  gameType?: GameType;
  duration?: Duration;
};

type FiltersState = {
  leaderboard: TFilterLeaderboard;
  profile: TFilterProfile;
  actions: {
    updateLeaderboardFilters: (
      filterKey: keyof TFilterLeaderboard,
      value: TFilterLeaderboard[typeof filterKey]
    ) => void;
    updateProfileFilters: (
      filterKey: keyof TFilterProfile,
      value: TFilterProfile[typeof filterKey]
    ) => void;
  };
};

const useFiltersStore = create<FiltersState>()((set) => ({
  leaderboard: {
    time: "ALL_TIME",
  },
  profile: {},
  actions: {
    updateLeaderboardFilters: (
      filterKey: keyof TFilterLeaderboard,
      value: TFilterLeaderboard[typeof filterKey]
    ) =>
      set((state) => ({
        leaderboard: { ...state.leaderboard, [filterKey]: value },
      })),
    updateProfileFilters: (
      filterKey: keyof TFilterProfile,
      value: TFilterProfile[typeof filterKey]
    ) =>
      set((state) => ({ profile: { ...state.profile, [filterKey]: value } })),
  },
}));

export const useFiltersLeaderboard = () =>
  useFiltersStore((state) => state.leaderboard);
export const useFiltersProfile = () =>
  useFiltersStore((state) => state.profile);
export const useFiltersActions = () =>
  useFiltersStore((state) => state.actions);
