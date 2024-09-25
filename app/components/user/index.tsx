"use client";

import { useUserStore } from "@/app/store/userStore";
import { useEffect } from "react";

export default function CreateUser() {
  const { users, getUsers } = useUserStore();
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm<UserFormData>();

  // const mutation = useCreateUser();

  // const onSubmit = (data: UserFormData) => {
  //   console.log(data, "data");
  //   // mutation.mutate(data);
  // };

  useEffect(() => {
    //   getUsers();
    getUsers();

    //   console.log(users, "users");
  }, [getUsers]);

  console.log(users, "users");

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">Criação de usuário</h1>
      <form className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input className="w-full border border-gray-300 px-3 py-2 rounded-lg" />
        </div>

        <div>
          <label className="block mb-1 font-medium">CPF</label>
          <input className="w-full border border-gray-300 px-3 py-2 rounded-lg" />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Criar usuário
          {/* {mutation.isLoading ? "Creating..." : "Create User"} */}
        </button>

        {/* {mutation.isError && (
          <div className="text-red-500 mt-2">
            {mutation.error?.message || "An error occurred"}
          </div>
        )}

        {mutation.isSuccess && (
          <div className="text-green-500 mt-2">User created successfully!</div>
        )} */}
      </form>
    </div>
  );
}
