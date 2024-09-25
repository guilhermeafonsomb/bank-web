"use client";
import UserContent from "@/app/components/userContent";
import { useUserStore } from "@/app/store/userStore";
import { useEffect } from "react";

export default function ListUsers() {
  const { setUser, getUsers, users } = useUserStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <section className="flex flex-col items-start gap-6">
      {users.map((user) => (
        <UserContent
          key={user.id}
          onClick={() => setUser(user.cpf)}
          user={user}
        />
      ))}
    </section>
  );
}
