import { faker } from "@faker-js/faker";
import type { RefObject } from "react";
import { create } from "zustand";
import {
  usePreferenceStore,
  type Duration,
  type GameType,
} from "~/stores/preference";
import { useCountdownStore } from "./countdown";

type State = "WAITING" | "TYPING" | "RESULT";

type EngineState = {
  state: State;
  words: string[];
  currentWord: string;
  input: string;
  inputs: string[];
  currentWordRef: RefObject<HTMLDivElement> | null;
  actions: {
    pressBackspace: () => void;
    pressKey: (key: string) => void;
    updateCurrentWordRef: (ref: RefObject<HTMLDivElement> | null) => void;
    updateState: (state: State) => void;
    reset: (duration?: Duration, gameType?: GameType) => void;
  };
};

const WORDS_COUNT = 500;

const generateWords = (gameType?: GameType) => {
  const generateRandomInRange = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

  if (gameType === "normal") return faker.random.words(WORDS_COUNT).split(" ");
  else if (gameType === "alphanumeric")
    return Array(WORDS_COUNT)
      .fill("")
      .map(() => faker.random.alphaNumeric(generateRandomInRange(4, 12)));
  else if (gameType === "alpha")
    return Array(WORDS_COUNT)
      .fill("")
      .map(() => faker.random.alpha(generateRandomInRange(4, 12)));
  else if (gameType === "numbers")
    return Array(WORDS_COUNT)
      .fill("")
      .map(() => faker.random.numeric(generateRandomInRange(4, 12)));

  return faker.random.words(WORDS_COUNT).toLowerCase().split(" ");
};

const words = generateWords();

export const useEngineStore = create<EngineState>((set, get) => ({
  state: "WAITING",
  words: words,
  currentWord: words[0] ?? "",
  input: "",
  inputs: [],
  currentWordRef: null,
  actions: {
    pressBackspace: () => {
      const { inputs, input, currentWordRef, words } = get();

      const currentIndex = inputs.length - 1;
      const currentWordElement = currentWordRef?.current;
      if (!input && inputs[currentIndex] !== words[currentIndex]) {
        currentWordElement?.previousElementSibling?.classList.remove(
          "right",
          "wrong"
        );

        return set((state) => ({
          currentWord: state.words[state.inputs.length - 1],
          input: state.inputs[state.inputs.length - 1],
          inputs: state.inputs.slice(0, state.inputs.length - 1),
        }));
      } else {
        return set((state) => ({
          input: state.input.slice(0, state.input.length - 1),
        }));
      }
    },
    pressKey: (key: string) => {
      const {
        input,
        currentWord,
        currentWordRef,
        actions: { reset },
      } = get();

      // If finished, we don't restart the game
      if (get().state === "RESULT") return;

      // Restart with Tab
      if (useCountdownStore.getState().ref === null && key === "Tab") {
        document
          .querySelectorAll(".wrong, .right")
          .forEach((el) => el.classList.remove("wrong", "right"));
        if (useCountdownStore.getState().ref) {
          clearInterval(useCountdownStore.getState().ref ?? undefined);
          useCountdownStore.getState().actions.updateTimerRef(null);
        }
        // generate words
        reset();
      }

      if (useCountdownStore.getState().ref === null && key !== "Tab") {
        useCountdownStore.getState().actions.begin();
        set({ state: "TYPING" });
      }

      const currentWordElement = currentWordRef?.current;

      currentWordElement?.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });

      switch (key) {
        case "Tab":
          if (
            useCountdownStore.getState().time !==
              usePreferenceStore.getState().duration ||
            useCountdownStore.getState().ref !== null
          ) {
            document
              .querySelectorAll(".wrong, .right")
              .forEach((el) => el.classList.remove("wrong", "right"));
            if (!!useCountdownStore.getState().ref) {
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              // clearInterval(useCountdownStore.getState().ref!);
              useCountdownStore.getState().actions.clear();
            }
            reset();
            document.getElementsByClassName("word")[0]?.scrollIntoView();
          }
          break;
        case " ":
          if (input === " ") return;
          currentWordElement?.classList.add(
            input !== currentWord ? "wrong" : "right"
          );

          return set((state) => ({
            input: "",
            currentWord: state.words[state.inputs.length + 1] ?? "",
            inputs: [...state.inputs, state.input],
          }));
          break;
        case "Backspace":
          get().actions.pressBackspace();
          break;
        default:
          return set((state) => ({
            input: state.input + key,
          }));
      }
    },
    updateCurrentWordRef: (ref: RefObject<HTMLDivElement> | null) =>
      set({ currentWordRef: ref }),
    updateState: (state: State) => set({ state }),
    reset: (duration?: Duration, gameType?: GameType) => {
      useCountdownStore.getState().actions.clear(duration);

      const words = generateWords(gameType);

      return set({
        state: "WAITING",
        words,
        currentWord: words[0] ?? "",
        input: "",
        inputs: [],
      });
    },
  },
}));
