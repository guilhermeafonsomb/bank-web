import { Input } from "@headlessui/react";
import Modal from "../../../components/modal";
import Button from "../../../components/button";
import { FormAccount } from "./formCreateAccountBank";
import { useForm } from "react-hook-form";
import { useAccountStore } from "@/src/app/store/accountStore";
import { useModalStore } from "@/src/app/store/modalStore";

export default function UpdateAccountModal({
  accountId,
}: {
  accountId: string;
}) {
  const { register, handleSubmit, reset } = useForm<FormAccount>();
  const { updateAccount } = useAccountStore();
  const { closeModal } = useModalStore();

  const onSubmit = async (data: FormAccount) => {
    try {
      updateAccount(accountId, data.accountName);

      reset();
      closeModal("updateAccountModal");
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <Modal modalId="updateAccountModal" modalTitle="Edição de nome">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="block mb-2 font-medium" htmlFor="account">
          Nome da conta
        </label>
        <Input
          {...register("accountName")}
          className="w-full mb-4 text-slate-950 px-3 py-2 rounded-lg"
        />
        <Button type="submit">Confirmar</Button>
      </form>
    </Modal>
  );
}
