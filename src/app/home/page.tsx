"use client";

import Dropdown from "../components/dropdown";
import Modal from "../components/modal";
import FormUser from "../components/formUser";
import { useUserStore } from "../store/userStore";
import { UserFormData } from "../shared/models/user.models";
import { createUsers } from "../services/userServices";
import { useEffect } from "react";

export default function Home() {
  const { setUser, getUsers, users } = useUserStore();

  const handleSubmitData = (userData: FormData) => {
    const dataUser: UserFormData = {
      name: userData.get("name") as string,
      cpf: userData.get("cpf") as string,
    };
    createUsers(dataUser);
  };

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <section className="flex justify-end">
      <section className="flex w-full gap-4 p-4 md:max-w-96">
        <div className="w-2/4">
          <Modal labelButton="Criar usuário" modalTitle="Crie um usuário">
            <FormUser onSubmitData={handleSubmitData} />
          </Modal>
        </div>

        <div className="w-2/4">
          <Dropdown labelButton="Trocar de usuário">
            <div className="flex flex-col gap-6 ">
              {users.map((user) => (
                <div
                  className="w-full flex flex-col gap-2 cursor-pointer"
                  key={user.id}
                  onClick={() => setUser(user.cpf)}
                >
                  <p className="text-sm">{user.name}</p>
                  <p className="text-xs text-slate-500">{user.cpf}</p>
                </div>
              ))}
            </div>
          </Dropdown>
        </div>
      </section>
    </section>
  );
}
