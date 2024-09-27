import { useModalStore } from "@/src/app/store/modalStore";
import Button from "../button";
import { UserFormData } from "../../shared/models/user.models";
import { useForm } from "react-hook-form";
import ErrorMessage from "../errorMessage";
import { validationMessages } from "../../shared/utils/messages";

interface FormUserProps {
  onSubmitData: (data: UserFormData) => void;
}

export default function FormUser({ onSubmitData }: FormUserProps) {
  const closeModal = useModalStore((state) => state.closeModal);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserFormData>();

  const handleCpfInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[.-]/g, "");
    setValue("cpf", value.trim());
  };

  const onSubmit = async (data: UserFormData) => {
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
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name" className="block mb-2 font-medium">
            Name
          </label>
          <input
            className="w-full border text-slate-950  px-3 py-2 rounded-lg"
            placeholder="Digite seu nome"
            id="user_name"
            {...register("name", { required: true })}
          />

          {errors.name && (
            <ErrorMessage message={validationMessages.required} />
          )}
        </div>

        <div>
          <label htmlFor="cpf" className="block mb-2 font-medium">
            CPF <small>(Somente números)</small>
          </label>
          <input
            className="w-full border text-slate-950 px-3 py-2 rounded-lg"
            placeholder="Digite seu cpf"
            id="user_cpf"
            {...register("cpf", {
              required: validationMessages.required,
              maxLength: {
                value: 11,
                message: validationMessages.maxLengthSm,
              },
              minLength: {
                value: 11,
                message: validationMessages.minLength,
              },
            })}
            onInput={handleCpfInput}
          />

          {errors.cpf && <ErrorMessage message={errors.cpf?.message} />}
        </div>

        <Button variation="primary" type="submit">
          Criar usuário
        </Button>
      </form>
    </div>
  );
}
