import { Account } from "../../shared/models/account.models";
import Button from "../button";
import Dropdown from "../dropdown";

interface ListAccountProps {
  accounts: Account[];
}

export default function ListAccounts({ accounts }: ListAccountProps) {
  console.log(accounts, "accounts");
  return (
    <section className="flex flex-col gap-4">
      <h1>Suas contas</h1>

      <section>
        {accounts.map((account) => (
          <section
            className="flex justify-between items-center"
            key={account.id}
          >
            <div>
              <p>{account.name}</p>
              <p>Valor da conta: {account.balance}</p>
            </div>
            <div>
              <Dropdown labelButton="...">
                <section className="w-full max-w-24">
                  <Button
                    className="w-full hover:text-red-500"
                    variation="ghost"
                  >
                    Editar
                  </Button>
                  <Button variation="ghost">Excluir</Button>
                  <Button variation="ghost">Sacar</Button>
                  <Button variation="ghost">Depositar</Button>
                </section>
              </Dropdown>
            </div>
          </section>
        ))}
      </section>
    </section>
  );
}
