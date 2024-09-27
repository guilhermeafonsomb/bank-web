import { useEffect } from "react";
import Dropdown from "../../components/dropdown";
import { useUserStore } from "../../store/userStore";
import Button from "../../components/button";

export default function ListUsersDropdown() {
  const { setUser, users, getUsers } = useUserStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <Dropdown labelButton="Trocar de usuário">
      <div className="flex flex-col gap-6 ">
        {users.map((user) => (
          <Button
            variation="ghost"
            className="w-full flex flex-col gap-2 cursor-pointer"
            key={user.id}
            onClick={() => setUser({ cpf: user.cpf, userId: user.id })}
          >
            <p className="text-sm">{user.name}</p>
            <p className="text-xs text-slate-500">{user.cpf}</p>
          </Button>
        ))}
      </div>
    </Dropdown>
  );
}
