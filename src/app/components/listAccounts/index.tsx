import { Account } from "../../shared/models/account.models";
import formatCurrency from "../../shared/utils/format/formatCurrency";
import { useModalStore } from "../../store/modalStore";
import Button from "../button";
import Dropdown from "../dropdown";

interface ListAccountProps {
  accounts: Account[];
}

export default function ListAccounts({ accounts }: ListAccountProps) {
  const { openModal } = useModalStore();

  return (
    <section className="flex flex-col gap-4 overflow-auto">
      <h1 className="font-bold text-xl">Suas contas</h1>

      <section className="flex flex-col gap-10  ">
        {accounts?.map((account) => (
          <section
            className="flex justify-between items-center"
            key={account.id}
          >
            <div>
              <p className="text-lg">
                <span className="font-bold">Nome da conta: </span>
                {account.name}
              </p>
              <p>
                <span className="font-bold">Saldo: </span>
                {formatCurrency(account.balance)}
              </p>
            </div>
            <div>
              <Dropdown labelButton="...">
                <section className="w-full max-w-24 flex flex-col gap-3">
                  <Button
                    className="w-full hover:text-violet-500"
                    variation="ghost"
                    onClick={() =>
                      openModal("updateAccountModal", {
                        accountId: account.id,
                      })
                    }
                  >
                    Editar
                  </Button>
                  <Button
                    className="w-full hover:text-red-500"
                    variation="ghost"
                    onClick={() =>
                      openModal("deleteAccountModal", {
                        accountId: account.id,
                      })
                    }
                  >
                    Excluir
                  </Button>
                  <Button
                    className="w-full hover:text-blue-500"
                    variation="ghost"
                    onClick={() =>
                      openModal("withdrawAccountModal", {
                        accountId: account.id,
                      })
                    }
                  >
                    Sacar
                  </Button>
                  <Button
                    className="w-full hover:text-emerald-500"
                    variation="ghost"
                    onClick={() =>
                      openModal("depositAccountModal", {
                        accountId: account.id,
                      })
                    }
                  >
                    Depositar
                  </Button>
                </section>
              </Dropdown>
            </div>
          </section>
        ))}
      </section>
    </section>
  );
}
