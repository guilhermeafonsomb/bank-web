import Button from "@/src/app/components/button";
import Modal from "@/src/app/components/modal";
import { FilterTransactionFormData } from "@/src/app/shared/models/transation.models";
import { useModalStore } from "@/src/app/store/modalStore";
import { useTransactionStore } from "@/src/app/store/transactionStore";
import { Input, Select } from "@headlessui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface FilterTransactionProps {
  userId: string;
}

export default function FilterTransaction({ userId }: FilterTransactionProps) {
  const closeModal = useModalStore((state) => state.closeModal);

  const { getTransactions } = useTransactionStore();

  const [transactionType, setTransactionType] = useState<
    "transferReceived" | "transferSent" | null
  >(null);
  const { register, handleSubmit } = useForm<FilterTransactionFormData>();

  const onSubmit = async (data: FilterTransactionFormData) => {
    const formData = {
      fromAccount: data.fromAccount || undefined,
      toAccount: data.toAccount || undefined,
      minAmount: Number(data.maxAmount) || undefined,
      maxAmount: Number(data.maxAmount) || undefined,
      startDate: data.startDate || undefined,
      endDate: data.endDate || undefined,
      type: transactionType || undefined,
    };

    await getTransactions(userId, formData);
    closeModal("filterTransactionModal");

    console.log(formData, "formData");
  };

  return (
    <Modal
      modalId="filterTransactionModal"
      labelButton="Filtrar"
      modalTitle="Filtrar"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col  gap-10 "
      >
        <div>
          <label className="block mb-2 font-medium" htmlFor="fromAccount">
            Conta remetente
          </label>
          <Input
            className="w-full text-slate-950  px-3 py-2 rounded-lg"
            {...register("fromAccount", {})}
          />
        </div>

        <div>
          <label className="block mb-2 font-medium" htmlFor="toAccount">
            Conta destinatária
          </label>
          <Input
            className="w-full text-slate-950  px-3 py-2 rounded-lg"
            {...register("toAccount", {})}
          />
        </div>

        <div>
          <label className="block mb-2 font-medium" htmlFor="minAmount">
            Valor mínimo
          </label>
          <Input
            className="w-full text-slate-950  px-3 py-2 rounded-lg"
            {...register("minAmount", {})}
            type="number"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium" htmlFor="maxAmount">
            Valor máximo
          </label>
          <Input
            className="w-full text-slate-950  px-3 py-2 rounded-lg"
            {...register("maxAmount", {})}
            type="number"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium" htmlFor="type">
            Tipo
          </label>
          <Select
            className="bg-transparent border border-gray-200 p-2 rounded w-full"
            onChange={(e) =>
              setTransactionType(
                e.target.value as "transferReceived" | "transferSent" | null
              )
            }
          >
            <option className="text-slate-950 cursor-not-allowed" value="">
              Selecione um tipo
            </option>

            <option
              className="text-slate-950 cursor-pointer"
              value="transferSent"
            >
              Enviada
            </option>

            <option
              className="text-slate-950 cursor-pointer"
              value="transferReceived"
            >
              Recebida
            </option>
          </Select>
        </div>
        <Button type="submit">Filtrar</Button>
      </form>
    </Modal>
  );
}
