import { Transaction } from "../../shared/models/transation.models";
import formatCurrency from "../../shared/utils/format/formatCurrency";
import formatDate from "../../shared/utils/format/formatDate";
import TagTypeTransfer from "../tagTypeTransfer";

interface ListTransactionsProps {
  transactions: Transaction[];
}

export default function ListTransactions({
  transactions,
}: ListTransactionsProps) {
  return (
    <section className="flex flex-col gap-10 ">
      {transactions.length === 0 ? (
        <p>Nem uma transação encontrada.</p>
      ) : (
        <>
          {transactions.map((transaction) => (
            <section key={transaction.id} className="flex flex-col gap-2">
              <section className="flex flex-col gap-2 md:flex-row">
                <div className="flex flex-col gap-2 w-full">
                  <p>
                    <span className="font-bold">Remetente: </span>
                    {transaction.fromAccountName}
                  </p>
                  <p>
                    <span className="font-bold">Destinatário: </span>

                    {transaction.toAccountName}
                  </p>
                </div>

                <div className="w-full flex flex-col gap-2 justify-between md:items-center md:flex-row">
                  <p>
                    <span className="font-bold">Valor: </span>

                    {formatCurrency(transaction.amount)}
                  </p>
                  <p>
                    <span className="font-bold">Data: </span>
                    {formatDate(transaction.createdAt)}
                  </p>
                </div>
              </section>

              <p>
                <span className="font-bold">
                  Tipo:
                  <TagTypeTransfer
                    type={
                      transaction.type as "transferReceived" | "transferSent"
                    }
                  />
                </span>
                {}
              </p>
            </section>
          ))}
        </>
      )}
    </section>
  );
}
