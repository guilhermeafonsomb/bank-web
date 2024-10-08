import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
  modalData?: unknown;
}

interface ModalStore {
  modals: { [key: string]: ModalState };
  openModal: (modalId: string, modalData?: unknown) => void;
  closeModal: (modalId: string) => void;
  modalType: string;
}

export const useModalStore = create<ModalStore>((set) => ({
  modals: {},
  modalType: "",

  openModal: (modalId: string, modalData?: unknown) =>
    set((state) => ({
      modals: {
        ...state.modals,
        [modalId]: { isOpen: true, modalData },
      },
      modalType: modalId,
    })),

  closeModal: (modalId: string) =>
    set((state) => ({
      modals: {
        ...state.modals,
        [modalId]: { ...state.modals[modalId], isOpen: false },
      },
    })),
}));
