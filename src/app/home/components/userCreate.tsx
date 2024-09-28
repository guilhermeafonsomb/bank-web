import FormUser from "../../components/formUser";
import Modal from "../../components/modal";
import { UserFormData } from "../../shared/models/user.models";
import { useModalStore } from "../../store/modalStore";
import { useUserStore } from "../../store/userStore";

export default function UserCreate() {
  const { createUser } = useUserStore();
  const { closeModal } = useModalStore();

  const handleUserCreate = async (userData: UserFormData) => {
    const dataUser = {
      name: userData.name,
      cpf: userData.cpf,
    };

    const newUser = await createUser(dataUser);

    if (newUser !== undefined) {
      closeModal("createUserModal");
    }
  };

  return (
    <Modal
      modalId="createUserModal"
      labelButton="Criar usuário"
      modalTitle="Crie um usuário"
    >
      <FormUser onSubmitData={handleUserCreate} />
    </Modal>
  );
}
