import { useModalStore } from "@/src/app/store/modalStore";
import Button from "../button";

interface FormUserProps {
  onSubmitData: (data: FormData) => void;
}

export default function FormUser({ onSubmitData }: FormUserProps) {
  const closeModal = useModalStore((state) => state.closeModal);

  const onSubmit = async (data: FormData) => {
    try {
      onSubmitData(data);
      closeModal();
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">Criação de usuário</h1>
      <form className="space-y-4" action={onSubmit} method="POST">
        <div>
          <label htmlFor="name" className="block mb-1 font-medium">
            Name
          </label>
          <input
            className="w-full border text-slate-950  px-3 py-2 rounded-lg"
            placeholder="Digite seu nome"
            id="user_name"
            name="name"
          />
        </div>

        <div>
          <label htmlFor="cpf" className="block mb-1 font-medium">
            CPF
          </label>
          <input
            className="w-full border text-slate-950 px-3 py-2 rounded-lg"
            placeholder="Digite seu cpf"
            id="user_cpf"
            name="cpf"
          />
        </div>

        <Button variation="primary" type="submit">
          Criar usuário
        </Button>
      </form>
    </div>
  );
}
