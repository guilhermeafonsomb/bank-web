import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
  modalData?: unknown;
}

interface ModalStore {
  modals: { [key: string]: ModalState };
  openModal: (modalId: string, modalData?: unknown) => void;
  closeModal: (modalId: string) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  modals: {},

  openModal: (modalId: string, modalData?: unknown) =>
    set((state) => ({
      modals: {
        ...state.modals,
        [modalId]: { isOpen: true, modalData },
      },
    })),

  closeModal: (modalId: string) =>
    set((state) => ({
      modals: {
        ...state.modals,
        [modalId]: { ...state.modals[modalId], isOpen: false },
      },
    })),
}));
