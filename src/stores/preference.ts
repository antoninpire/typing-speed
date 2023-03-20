import { create } from "zustand";
import { useEngineStore } from "~/stores/engine";

export type Duration = 15 | 30 | 45 | 60;
export type WordsCount = 12 | 24 | 36;
export type GameType =
  | "lowercase"
  | "normal"
  | "numbers"
  | "alpha"
  | "alphanumeric";

type PreferenceState = {
  duration: Duration;
  wordsCount: WordsCount;
  gameType: GameType;
  actions: {
    updateDuration: (duration: Duration) => void;
    updateWordsCount: (wordsCount: WordsCount) => void;
    updateGameType: (gameType: GameType) => void;
  };
};

export const usePreferenceStore = create<PreferenceState>()((set) => ({
  duration: 30,
  wordsCount: 12,
  gameType: "lowercase",
  actions: {
    updateDuration: (duration: Duration) => {
      useEngineStore.getState().actions.reset(duration);
      return set({ duration });
    },
    updateWordsCount: (wordsCount: WordsCount) => {
      return set({ wordsCount });
    },
    updateGameType: (gameType: GameType) => {
      useEngineStore.getState().actions.reset(undefined, gameType);
      return set({ gameType });
    },
  },
}));

export const usePreferenceDuration = () =>
  usePreferenceStore((state) => state.duration);
export const usePreferenceWordsCount = () =>
  usePreferenceStore((state) => state.wordsCount);
export const usePreferenceGameType = () =>
  usePreferenceStore((state) => state.gameType);
export const usePreferenceActions = () =>
  usePreferenceStore((state) => state.actions);
