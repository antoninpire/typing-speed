import type { RefObject } from "react";
import { create } from "zustand";
import type { Duration } from "~/common/durations";
import type { GameType } from "~/common/game-types";
import { usePreferenceStore } from "~/stores/preference";
import { generateWords } from "~/utils/generate-words";
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

const words = generateWords(usePreferenceStore.getState().gameType);

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

      // If previous word
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
        // If current word
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
        // We remove all colors classes
        document
          .querySelectorAll(".wrong, .right")
          .forEach((el) => el.classList.remove("wrong", "right"));

        // If countdown is running, we clear the interval
        if (useCountdownStore.getState().ref)
          useCountdownStore.getState().actions.clear();
        reset();
      }

      // If countdown isn't running and a key is pressed, we begin
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
            // We remove all colors classes
            document
              .querySelectorAll(".wrong, .right")
              .forEach((el) => el.classList.remove("wrong", "right"));

            // If countdown is running, we clear the interval
            if (useCountdownStore.getState().ref)
              useCountdownStore.getState().actions.clear();
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
