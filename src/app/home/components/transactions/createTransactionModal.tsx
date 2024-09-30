import Modal from "@/src/app/components/modal";
import FormTransaction from "./formTransation";

export default function CreateTransactionModal() {
  return (
    <Modal
      modalId="createTransactionModal"
      labelButton="Criar transação"
      modalTitle="Crie uma transação"
    >
      <FormTransaction />
    </Modal>
  );
}
