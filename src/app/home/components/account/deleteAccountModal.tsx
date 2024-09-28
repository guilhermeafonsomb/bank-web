import Button from "../../../components/button";
import Modal from "../../../components/modal";
import { useAccountStore } from "../../../store/accountStore";
import { useModalStore } from "../../../store/modalStore";

export default function DeleteAccountModal({
  accountId,
}: {
  accountId: string;
}) {
  const { closeModal } = useModalStore();
  const { deleteAccount } = useAccountStore();

  const handleDeleteAccount = () => {
    deleteAccount(accountId);
    closeModal("deleteAccountModal");
  };

  return (
    <Modal
      modalId="deleteAccountModal"
      modalTitle="Tem certeza que deseja excluir a conta?"
    >
      <Button onClick={handleDeleteAccount}>Deletar</Button>
    </Modal>
  );
}
