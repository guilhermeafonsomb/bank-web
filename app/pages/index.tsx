"use client";

import Dropdown from "../components/dropdown";
import Modal from "../components/modal";
import FormUser from "../components/formUser";
import { useUserStore } from "../store/userStore";
import { useEffect } from "react";

export default function Home() {
  const { users, getUsers, setUser } = useUserStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <section className="flex justify-end gap-4 p-4">
      <Modal labelButton="Criar usuário" modalTitle="Crie um usuário">
        <FormUser />
      </Modal>
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
    </section>
  );
}
