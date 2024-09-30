"use client";

import { useUserStore } from "../store/userStore";
import { useEffect } from "react";
import Tabs from "../components/tabs";

import UserCreate from "./components/user/userCreate";
import ListUsersDropdown from "./components/user/listUsersDropdown";
import Accounts from "./components/account/accounts";
import Transactions from "./components/transactions/transactions";

export default function Home() {
  const { loadUserFromLocalStorage, chosenUser } = useUserStore();

  useEffect(() => {
    loadUserFromLocalStorage();
  }, [loadUserFromLocalStorage]);

  const userId = chosenUser?.id as string;

  const tabs = [
    {
      label: "Contas bancárias",
      content: <Accounts userId={userId} />,
    },
    { label: "Movimentações", content: <Transactions userId={userId} /> },
  ];

  return (
    <section>
      <section className="flex justify-end">
        <section className="flex w-full gap-4 p-4 items-center md:max-w-96">
          <div className="w-2/4">
            <UserCreate />
          </div>

          <div className="w-2/4">
            <ListUsersDropdown />
          </div>
        </section>
      </section>
      <section className="flex items-center justify-center w-full ">
        {chosenUser && (
          <div className="flex flex-col gap-3 max-w-4xl px-2 items-start justify-center w-full">
            <p>
              <span className="font-bold">Usuário: </span>
              {chosenUser?.name}
            </p>
            <Tabs tabs={tabs} />
          </div>
        )}
      </section>
      <div className="flex justify-center items-center">
        {!chosenUser && <p className="text-3xl">Escolha um usuário</p>}
      </div>
    </section>
  );
}
