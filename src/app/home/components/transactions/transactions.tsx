import ListTransactions from "@/src/app/components/listTransactions";
import CreateTransactionModal from "./createTransactionModal";
import { useTransactionStore } from "@/src/app/store/transactionStore";
import { useEffect } from "react";

interface TransactionsProps {
  userId: string;
}

export default function Transactions({ userId }: TransactionsProps) {
  const { getTransactions, transactions } = useTransactionStore();

  useEffect(() => {
    getTransactions(userId);
  }, [getTransactions, userId]);

  return (
    <section className="flex flex-col gap-7">
      <div className="w-full md:max-w-96">
        <CreateTransactionModal />
      </div>

      <div>
        <ListTransactions transactions={transactions} />
      </div>
    </section>
  );
}
