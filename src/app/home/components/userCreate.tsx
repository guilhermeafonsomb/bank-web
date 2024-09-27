import FormUser from "../../components/formUser";
import Modal from "../../components/modal";
import { UserFormData } from "../../shared/models/user.models";
import { useUserStore } from "../../store/userStore";

export default function UserCreate() {
  const { createUser, addUserToState } = useUserStore();

  const handleUserCreate = async (userData: UserFormData) => {
    const dataUser = {
      name: userData.name,
      cpf: userData.cpf,
    };

    const newUser = await createUser(dataUser);

    if (newUser !== undefined) {
      addUserToState(newUser);
    }
  };

  return (
    <Modal labelButton="Criar usuário" modalTitle="Crie um usuário">
      <FormUser onSubmitData={handleUserCreate} />
    </Modal>
  );
}
