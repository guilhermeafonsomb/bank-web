"use client";

import { useUserStore } from "../store/userStore";
import { useEffect } from "react";
import Tabs from "../components/tabs";
import { Button } from "@headlessui/react";
import FormCreateAccountBank, {
  FormAccount,
} from "../components/form-create-account-bank";
import UserCreate from "./components/userCreate";
import ListUsersDropdown from "./components/listUsersDropdown";

export default function Home() {
  const { loadUserFromLocalStorage, chosenUser } = useUserStore();

  useEffect(() => {
    loadUserFromLocalStorage();
  }, [loadUserFromLocalStorage]);

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
            <UserCreate />
          </div>

          <div className="w-2/4">
            <ListUsersDropdown />
          </div>
        </section>
      </section>
      <section className="flex items-center justify-center w-full">
        <Tabs tabs={tabs} />
      </section>
    </section>
  );
}
