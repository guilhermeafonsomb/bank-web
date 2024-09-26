import { useModalStore } from "@/src/app/store/modalStore";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Button from "../button";

interface ModalProps {
  children: React.ReactNode;
  labelButton: string;
  modalTitle: string;
}

export default function Modal({
  children,
  labelButton,
  modalTitle,
}: ModalProps) {
  const { isOpen, openModal, closeModal } = useModalStore();

  return (
    <>
      <Button variation="primary-ghost" onClick={() => openModal()}>
        {labelButton}
      </Button>
      <Dialog
        open={isOpen}
        onClose={() => closeModal()}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="w-full max-w-[500px] space-y-4 rounded-lg bg-slate-900 p-12">
            <DialogTitle className="font-bold">{modalTitle}</DialogTitle>
            {children}
            <div className="flex items-center justify-center">
              <Button variation="secondary-ghost" onClick={() => closeModal()}>
                Cancelar
              </Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
