import { useModalStore } from "@/app/store/modalStore";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

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
      <button
        className="text-blue-500 cursor-pointer p-2 rounded transition ease-in-out delay-150 hover:text-blue-700 active:text-blue-900"
        onClick={() => openModal()}
      >
        {labelButton}
      </button>
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
              <button className="text-red-500" onClick={() => closeModal()}>
                Cancelar
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
