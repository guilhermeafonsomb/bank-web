"use client";
import { User } from "@/app/shared/models/user.models";

interface UserContentProps {
  user: User;
  onClick: () => void;
}

export default function UserContent({ user, onClick }: UserContentProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col gap-1 items-start hover:bg-slate-800 rounded p-2"
    >
      <p className="text-start">Nome: {user.name}</p>
      <p className="text-start">CPF: {user.cpf}</p>
    </button>
  );
}
