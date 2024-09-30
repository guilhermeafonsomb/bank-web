import Button from "@/src/app/components/button";
import Modal from "@/src/app/components/modal";
import { useAccountStore } from "@/src/app/store/accountStore";
import { useModalStore } from "@/src/app/store/modalStore";
import { Input } from "@headlessui/react";
import { useForm } from "react-hook-form";

interface DepositModalProps {
  accountId: string;
}

export default function DepositAccountModal({ accountId }: DepositModalProps) {
  const { closeModal } = useModalStore();
  const { deposit } = useAccountStore();

  const { register, handleSubmit, reset } = useForm<{ amount: number }>();

  const onSubmit = async (data: { amount: number }) => {
    try {
      deposit(accountId, data.amount);

      reset();
      closeModal("depositAccountModal");
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <Modal modalId="depositAccountModal" modalTitle="Depositar">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          type="number"
          className="w-full mb-4 text-slate-950 px-3 py-2 rounded-lg"
          placeholder="Digite o valor que deseja depositar"
          {...register("amount")}
        />
        <Button>Depositar</Button>
      </form>
    </Modal>
  );
}
