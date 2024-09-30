"use client";

import { useUserStore } from "../store/userStore";
import { useEffect } from "react";
import Tabs from "../components/tabs";
import { Button } from "@headlessui/react";

import UserCreate from "./components/userCreate";
import ListUsersDropdown from "./components/listUsersDropdown";
import Accounts from "./components/account/accounts";

export default function Home() {
  const { loadUserFromLocalStorage, chosenUser } = useUserStore();

  useEffect(() => {
    loadUserFromLocalStorage();
  }, [loadUserFromLocalStorage]);

  const tabs = [
    {
      label: "Contas bancárias",
      content: <Accounts userId={chosenUser?.id as string} />,
    },
    { label: "tab 2", content: <Button>Tab 2</Button> },
    { label: "tab 3", content: <Button>Tab 3</Button> },
  ];

  return (
    <section>
      <section className="flex justify-end">
        <section className="flex w-full gap-4 p-4 md:max-w-96">
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
          <div className="flex flex-col gap-3 max-w-4xl items-start justify-center w-full">
            Usuário: {chosenUser?.name}
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
