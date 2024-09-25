"use client";

import Dropdown from "../components/dropdown";
import { useUserStore } from "../store/userStore";
import { useEffect } from "react";

export default function Home() {
  const { users, getUsers } = useUserStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <section className="flex  justify-end p-4">
      <Dropdown labelButton="Trocar de usuário">
        <div className="flex flex-col gap-6 ">
          {users.map((user) => (
            <div
              className="w-full flex flex-col gap-2 cursor-pointer"
              key={user.id}
            >
              <p className="text-sm">Nome: {user.name}</p>
              <p className="text-xs text-slate-500">CPF: {user.cpf}</p>
            </div>
          ))}
        </div>
      </Dropdown>
    </section>
  );
}
