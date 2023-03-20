import { create } from "zustand";
import type { Duration } from "~/common/durations";
import { gameTypeSchema, type GameType } from "~/common/game-types";
import { themeSchema, type Theme } from "~/common/themes";
import { useEngineStore } from "~/stores/engine";

type PreferenceState = {
  duration: Duration;
  gameType: GameType;
  theme: Theme;
  actions: {
    updateDuration: (duration: Duration) => void;
    updateGameType: (gameType: GameType) => void;
    updateTheme: (theme: Theme) => void;
  };
};

const DURATION_STORAGE_KEY = "@preferences-duration";
const GAME_TYPE_STORAGE_KEY = "@preferences-game-type";
const THEME_STORAGE_KEY = "@preferences-theme";

const loadFromLocalStorage = () => {
  let parsedDuration: Duration = 30;
  let parsedGameType: GameType = "lowercase";
  let parsedTheme: Theme = "default";

  if (typeof window === "undefined")
    return {
      duration: parsedDuration,
      gameType: parsedGameType,
      theme: parsedTheme,
    };

  const duration = window.localStorage.getItem(DURATION_STORAGE_KEY);
  if (duration)
    parsedDuration = isNaN(parseInt(duration))
      ? 30
      : (parseInt(duration) as Duration);

  const gameType = window.localStorage.getItem(GAME_TYPE_STORAGE_KEY);
  if (gameType) {
    const result = gameTypeSchema.safeParse(gameType.replace(/['"]+/g, ""));
    if (result.success) parsedGameType = result.data;
  }

  const theme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (theme) {
    const result = themeSchema.safeParse(theme.replace(/['"]+/g, ""));
    if (result.success) {
      parsedTheme = result.data;
      if (typeof window !== "undefined")
        document.documentElement.setAttribute("data-theme", parsedTheme);
    }
  }

  return {
    duration: parsedDuration,
    gameType: parsedGameType,
    theme: parsedTheme,
  };
};

const loadToLocalStorage = (key: string, value: unknown) => {
  if (typeof window === "undefined") return;
  return window.localStorage.setItem(key, JSON.stringify(value));
};

const { duration, gameType, theme } = loadFromLocalStorage();

export const usePreferenceStore = create<PreferenceState>()((set, get) => ({
  duration,
  gameType,
  theme,
  actions: {
    updateDuration: (duration: Duration) => {
      loadToLocalStorage(DURATION_STORAGE_KEY, duration);
      useEngineStore.getState().actions.reset(duration, get().gameType);
      return set({ duration });
    },
    updateGameType: (gameType: GameType) => {
      loadToLocalStorage(GAME_TYPE_STORAGE_KEY, gameType);
      useEngineStore.getState().actions.reset(get().duration, gameType);
      return set({ gameType });
    },
    updateTheme: (theme: Theme) => {
      if (typeof window !== "undefined")
        document.documentElement.setAttribute("data-theme", theme);
      loadToLocalStorage(THEME_STORAGE_KEY, theme);
      return set({ theme });
    },
  },
}));

export const usePreferenceDuration = () =>
  usePreferenceStore((state) => state.duration);
export const usePreferenceGameType = () =>
  usePreferenceStore((state) => state.gameType);
export const usePreferenceTheme = () =>
  usePreferenceStore((state) => state.theme);
export const usePreferenceActions = () =>
  usePreferenceStore((state) => state.actions);
