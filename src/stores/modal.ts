type TModal = "LOGIN" | "SIGNUP";
import { create } from "zustand";

type ModalState = {
  currentModal?: TModal;
  actions: {
    updateCurrentModal: (modal?: TModal) => void;
  };
};

export const useModalStore = create<ModalState>()((set) => ({
  actions: {
    updateCurrentModal: (modal?: TModal) => set({ currentModal: modal }),
  },
}));

export const useModalCurrent = () =>
  useModalStore((state) => state.currentModal);
export const useModalActions = () => useModalStore((state) => state.actions);
