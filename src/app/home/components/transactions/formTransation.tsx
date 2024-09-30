import { useEffect, useState } from "react";
import { useAccountStore } from "@/src/app/store/accountStore";
import { Input, Select } from "@headlessui/react";
import Modal from "@/src/app/components/modal";
import { TransactionFormData } from "@/src/app/shared/models/transation.models";
import { useForm } from "react-hook-form";
import formatCurrency from "@/src/app/shared/utils/format/formatCurrency";
import Button from "@/src/app/components/button";
import { Account, AccountByName } from "@/src/app/shared/models/account.models";
import ErrorMessage from "@/src/app/components/errorMessage";
import { validationMessages } from "@/src/app/shared/utils/messages";
import { useTransactionStore } from "@/src/app/store/transactionStore";
import { useModalStore } from "@/src/app/store/modalStore";
import FilterTransaction from "./filterTransaction";

interface FormTransactionProps {
  userId: string;
}

export default function FormTransaction({ userId }: FormTransactionProps) {
  const closeModal = useModalStore((state) => state.closeModal);

  const { accounts, getAccounts } = useAccountStore();
  const { createTransaction } = useTransactionStore();

  const { searchedAccount, searchAccountByName } = useAccountStore();
  const [accountName, setAccountName] = useState<string | null>(null);
  const [chosenAccount, setChosenAccount] = useState<Account | null>(null);
  const [payload, setPayload] = useState<TransactionFormData | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TransactionFormData>();

  const handleSearch = async () => {
    await searchAccountByName(accountName as string);
  };

  const onSubmit = async (data: TransactionFormData) => {
    const payload = {
      fromAccount: chosenAccount?.id as string,
      toAccount: (searchedAccount as AccountByName)?.id,
      amount: Number(data.amount),
      userId: userId,
    };
    setPayload(payload);

    createTransaction(payload as TransactionFormData);
    setPayload(null);
    setAccountName(null);
    setChosenAccount(null);
    reset();

    closeModal("createTransactionModal");
  };

  useEffect(() => {
    getAccounts(userId);
  }, [getAccounts, userId]);

  return (
    <div className="flex flex-col w-full md:justify-between md:flex-row">
      <div className="md:max-w-36">
        <Modal
          modalId="createTransactionModal"
          labelButton="Criar transação"
          modalTitle="Crie uma transação"
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center gap-10 "
          >
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="w-full">
                <label className="block mb-2 font-medium" htmlFor="account">
                  Conta rementente
                </label>
                <Select
                  onChange={(e) => {
                    const selectedAccount = accounts.find(
                      (account) => account.id === e.target.value
                    );
                    setChosenAccount(selectedAccount as Account);
                  }}
                  className="bg-transparent border border-gray-200 p-2 rounded w-full"
                >
                  <option
                    className="text-slate-950 cursor-not-allowed"
                    value=""
                  >
                    Escolha uma conta:
                  </option>
                  {accounts?.map((account) => (
                    <option
                      className="text-slate-950 cursor-pointer"
                      key={account.id}
                      value={account.id}
                    >
                      {account.name} {account.balance}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="block mb-2 font-medium" htmlFor="amount">
                  Conta remetente
                </label>
                <Input
                  className="w-full text-slate-950  px-3 py-2 rounded-lg"
                  {...register("amount", {
                    max: {
                      value: chosenAccount?.balance as number,
                      message: validationMessages.balance,
                    },
                    required: true,
                  })}
                  type="number"
                />
                {errors.amount && (
                  <ErrorMessage message={errors.amount.message} />
                )}
                <p className="text-sm mt-1">
                  Saldo:{" "}
                  {chosenAccount?.balance
                    ? formatCurrency(chosenAccount?.balance as number)
                    : formatCurrency(0)}
                </p>
              </div>
            </div>
            <div className="w-full flex flex-col  items-center gap-2 md:flex-row md:items-end">
              <div className="md:w-1/2">
                <label className="block mb-2 font-medium" htmlFor="account">
                  Conta destinatária
                </label>
                <Input
                  className="w-full text-slate-950  px-3 py-2 rounded-lg"
                  value={accountName as string}
                  onChange={(e) => setAccountName(e.target.value)}
                />
              </div>
              <div className="md:w-1/2 mt-1 md:mt-0">
                <div
                  className="w-full px-4 py-2 cursor-pointer"
                  onClick={handleSearch}
                >
                  Buscar conta
                </div>
              </div>
            </div>

            <Button disabled={!searchedAccount && !payload} type="submit">
              Criar transação
            </Button>
          </form>
        </Modal>
      </div>

      <div className="md:max-w-36">
        <FilterTransaction userId={userId} />
      </div>
    </div>
  );
}
