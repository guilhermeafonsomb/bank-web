import { useModalStore } from "@/src/app/store/modalStore";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";
import Button from "../button";

interface ModalProps {
  children: React.ReactNode;
  labelButton?: string;
  modalTitle: string;
  modalId: string;
}

export default function Modal({
  children,
  labelButton,
  modalTitle,
  modalId,
}: ModalProps) {
  const { openModal, closeModal, modals } = useModalStore();

  const isOpen = modals[modalId]?.isOpen || false;

  return (
    <>
      {labelButton && (
        <Button variation="primary-ghost" onClick={() => openModal(modalId)}>
          {labelButton}
        </Button>
      )}

      <Dialog
        open={isOpen}
        onClose={() => closeModal(modalId)}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="w-full max-w-[500px] space-y-4 rounded-lg bg-slate-900 p-12">
            <DialogTitle className="font-bold">{modalTitle}</DialogTitle>
            {children}
            <div className="flex items-center justify-center">
              <Button
                variation="secondary-ghost"
                onClick={() => closeModal(modalId)}
              >
                Cancelar
              </Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
