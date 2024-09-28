import { useEffect } from "react";
import FormCreateAccountBank, { FormAccount } from "./formCreateAccountBank";
import ListAccounts from "../../../components/listAccounts";
import { useAccountStore } from "../../../store/accountStore";
import { useModalStore } from "../../../store/modalStore";
import DeleteAccountModal from "./deleteAccountModal";
import UpdateAccountModal from "./updateAccountModal";

interface CreateAndListAccountsProps {
  userId: string;
}

export default function Accounts({ userId }: CreateAndListAccountsProps) {
  const { getAccounts, accounts, createAccount } = useAccountStore();
  const { modals } = useModalStore();

  const accountId = (
    modals["updateAccountModal"]?.modalData as { accountId: string }
  )?.accountId;

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
      <DeleteAccountModal accountId={accountId} />

      <UpdateAccountModal accountId={accountId} />
    </section>
  );
}
