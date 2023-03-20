import { create } from "zustand";
import { usePreferenceStore } from "~/stores/preference";
import type { Duration } from "./preference";

type CountdownRef = NodeJS.Timer | null;

type CountdownState = {
  ref: CountdownRef;
  time: number;
  actions: {
    decrement: () => void;
    updateTimer: (time: number) => void;
    updateTimerRef: (ref: CountdownRef) => void;
    begin: () => void;
    clear: (duration?: Duration) => void;
  };
};

export const useCountdownStore = create<CountdownState>((set, get) => ({
  ref: null,
  time: usePreferenceStore.getState().duration,
  actions: {
    decrement: () => set((state) => ({ time: state.time - 1 })),
    updateTimer: (time) => set({ time }),
    updateTimerRef: (ref: CountdownRef) => {
      return set({ ref });
    },
    begin: () => {
      const ref = setInterval(() => {
        get().actions.decrement();
      }, 1000);
      return set({ ref });
    },
    clear: (duration?: Duration) => {
      if (!!get().ref) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        clearInterval(get().ref!);
      }
      return set({
        ref: null,
        time: duration || usePreferenceStore.getState().duration,
      });
    },
  },
}));

export const useCountdownTime = () => useCountdownStore((state) => state.time);
export const useCountdownRef = () => useCountdownStore((state) => state.ref);
export const useCountdownActions = () =>
  useCountdownStore((state) => state.actions);
