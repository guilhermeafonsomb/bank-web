import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
  modalData?: unknown; // Você pode incluir dados específicos da modal aqui
}

interface ModalStore {
  modals: { [key: string]: ModalState }; // Cada modal terá um estado com dados
  openModal: (modalId: string, modalData?: unknown) => void; // Pode passar dados opcionais
  closeModal: (modalId: string) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  modals: {},

  openModal: (modalId: string, modalData?: unknown) =>
    set((state) => ({
      modals: {
        ...state.modals,
        [modalId]: { isOpen: true, modalData }, // Abre modal e define dados opcionais
      },
    })),

  closeModal: (modalId: string) =>
    set((state) => ({
      modals: {
        ...state.modals,
        [modalId]: { ...state.modals[modalId], isOpen: false }, // Fecha o modal
      },
    })),
}));
