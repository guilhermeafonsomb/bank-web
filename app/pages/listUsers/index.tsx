"use client";
import UserContent from "@/app/components/userContent";
import { getUsers } from "@/app/services/userServices";
import { User } from "@/app/shared/models/user.models";
import { useUserStore } from "@/app/store/userStore";

export default async function ListUsers() {
  const { setUser } = useUserStore();
  const users: User[] = await getUsers();

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
