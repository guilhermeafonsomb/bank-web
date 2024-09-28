import { useEffect } from "react";
import FormCreateAccountBank, {
  FormAccount,
} from "../../components/form-create-account-bank";
import ListAccounts from "../../components/listAccounts";
import { useAccountStore } from "../../store/accountStore";
import Modal from "../../components/modal";
import Button from "../../components/button";
import { useModalStore } from "../../store/modalStore";

interface CreateAndListAccountsProps {
  userId: string;
}

export default function CreateAndListAccounts({
  userId,
}: CreateAndListAccountsProps) {
  const { getAccounts, accounts, deleteAccount, createAccount } =
    useAccountStore();
  const { modals, closeModal } = useModalStore();

  const handleDeleteAccount = () => {
    const accountId = modals["deleteAccountModal"]?.modalData;
    deleteAccount((accountId as { accountId: string }).accountId);
    closeModal("deleteAccountModal");
  };

  useEffect(() => {
    getAccounts(userId);
  }, [getAccounts, userId]);

  const handleAccountCreate = (accountData: FormAccount) => {
    console.log(accountData, "accountData");
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
      <Modal
        modalId="deleteAccountModal"
        modalTitle="Tem certeza que deseja excluir a conta?"
      >
        <Button onClick={handleDeleteAccount}>Deletar</Button>
      </Modal>
    </section>
  );
}
