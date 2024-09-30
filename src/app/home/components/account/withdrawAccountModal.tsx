import Button from "@/src/app/components/button";
import Modal from "@/src/app/components/modal";
import { useAccountStore } from "@/src/app/store/accountStore";
import { useModalStore } from "@/src/app/store/modalStore";
import { Input } from "@headlessui/react";
import { useForm } from "react-hook-form";

interface WithdrawModalProps {
  accountId: string;
}

export default function WithdrawAccountModal({
  accountId,
}: WithdrawModalProps) {
  const { closeModal } = useModalStore();
  const { withdraw } = useAccountStore();

  const { register, handleSubmit, reset } = useForm<{ amount: number }>();

  const onSubmit = async (data: { amount: number }) => {
    try {
      withdraw(accountId, data.amount);

      reset();
      closeModal("withdrawAccountModal");
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <Modal modalId="withdrawAccountModal" modalTitle="Sacar">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          type="number"
          className="w-full mb-4 text-slate-950 px-3 py-2 rounded-lg"
          placeholder="Digite o valor que deseja sacar"
          {...register("amount")}
        />
        <Button>Sacar</Button>
      </form>
    </Modal>
  );
}
