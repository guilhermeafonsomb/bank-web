import { User } from "@/src/app/shared/models/user.models";
import Button from "../button";

interface UserContentProps {
  user: User;
  onClick: () => void;
}

export default function UserContent({ user, onClick }: UserContentProps) {
  return (
    <Button onClick={onClick} variation="ghost">
      <p className="text-start">Nome: {user.name}</p>
      <p className="text-start">CPF: {user.cpf}</p>
    </Button>
  );
}
