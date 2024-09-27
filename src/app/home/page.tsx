"use client";

import Dropdown from "../components/dropdown";
import Modal from "../components/modal";
import FormUser from "../components/formUser";
import { useUserStore } from "../store/userStore";
import { UserFormData } from "../shared/models/user.models";
import { createUsers } from "../services/userServices";
import { useEffect } from "react";
import Tabs from "../components/tabs";
import { Button } from "@headlessui/react";
import FormCreateAccountBank, {
  FormAccount,
} from "../components/form-create-account-bank";

export default function Home() {
  const { setUser, getUsers, users, loadUserFromLocalStorage, chosenUser } =
    useUserStore();

  useEffect(() => {
    getUsers();
    loadUserFromLocalStorage();
  }, [getUsers, loadUserFromLocalStorage]);

  const handleUserCreate = (userData: UserFormData) => {
    const dataUser = {
      name: userData.name,
      cpf: userData.cpf,
    };
    createUsers(dataUser);
  };

  const handleAccountCreate = (accountData: FormAccount) => {
    console.log(accountData, "accountData");
    console.log(chosenUser, "chosenUser");
  };

  const tabs = [
    {
      label: "tab 1",
      content: <FormCreateAccountBank onSubmitData={handleAccountCreate} />,
    },
    { label: "tab 2", content: <Button>Tab 2</Button> },
    { label: "tab 3", content: <Button>Tab 3</Button> },
  ];

  return (
    <section>
      <section className="flex justify-end">
        <section className="flex w-full gap-4 p-4 md:max-w-96">
          <div className="w-2/4">
            <Modal labelButton="Criar usuário" modalTitle="Crie um usuário">
              <FormUser onSubmitData={handleUserCreate} />
            </Modal>
          </div>

          <div className="w-2/4">
            <Dropdown labelButton="Trocar de usuário">
              <div className="flex flex-col gap-6 ">
                {users.map((user) => (
                  <div
                    className="w-full flex flex-col gap-2 cursor-pointer"
                    key={user.id}
                    onClick={() => setUser({ cpf: user.cpf, userId: user.id })}
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
      <section className="flex items-center justify-center w-full">
        <Tabs tabs={tabs} />
      </section>
    </section>
  );
}
