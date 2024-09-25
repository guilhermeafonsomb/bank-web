"use client";

import { createUsers } from "@/app/services/userServices";
import { UserFormData } from "@/app/shared/models/user.models";
import { useModalStore } from "@/app/store/modalStore";
import { useForm } from "react-hook-form";

export default function FormUser() {
  const closeModal = useModalStore((state) => state.closeModal);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>();

  const onSubmit = async (data: UserFormData) => {
    try {
      await createUsers(data);
      closeModal();
    } catch (error) {
      console.log(error, "error");
    }

    console.log(data, "data");
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">Criação de usuário</h1>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            className="w-full border text-slate-950  px-3 py-2 rounded-lg"
            placeholder="Digite seu nome"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span className="text-red-500 mt-1">Nome é obrigatório</span>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">CPF</label>
          <input
            className="w-full border text-slate-950 px-3 py-2 rounded-lg"
            placeholder="Digite seu cpf"
            {...register("cpf", { required: true })}
          />
          {errors.cpf && (
            <span className="text-red-500 mt-1">CPF é obrigatório</span>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Criar usuário
        </button>
      </form>
    </div>
  );
}
