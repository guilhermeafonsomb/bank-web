import { useEffect } from "react";
import FormCreateAccountBank, { FormAccount } from "./formCreateAccountBank";
import ListAccounts from "../../../components/listAccounts";
import { useAccountStore } from "../../../store/accountStore";
import { useModalStore } from "../../../store/modalStore";
import DeleteAccountModal from "./deleteAccountModal";
import UpdateAccountModal from "./updateAccountModal";
import WithdrawAccountModal from "./withdrawAccountModal";
import DepositAccountModal from "./depositAccountModal";

interface AccountsProps {
  userId: string;
}

export default function Accounts({ userId }: AccountsProps) {
  const { getAccounts, accounts, createAccount } = useAccountStore();
  const { modals, modalType } = useModalStore();

  const accountId = (modals[modalType]?.modalData as { accountId: string })
    ?.accountId;

  useEffect(() => {
    getAccounts(userId);
  }, [getAccounts, userId]);

  const handleAccountCreate = (accountData: FormAccount) => {
    const payload = {
      name: accountData.accountName,
      userId,
    };
    createAccount(payload);
  };

  return (
    <section className="flex flex-col gap-4">
      <FormCreateAccountBank onSubmitData={handleAccountCreate} />
      <ListAccounts accounts={accounts} />
      <UpdateAccountModal accountId={accountId} />
      <DeleteAccountModal accountId={accountId} />
      <WithdrawAccountModal accountId={accountId} />
      <DepositAccountModal accountId={accountId} />
    </section>
  );
}
