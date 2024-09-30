import FormUser from "./formUser";
import Modal from "../../../components/modal";

export default function UserCreate() {
  return (
    <Modal
      modalId="createUserModal"
      labelButton="Criar usuário"
      modalTitle="Crie um usuário"
    >
      <FormUser />
    </Modal>
  );
}
