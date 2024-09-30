import ListTransactions from "@/src/app/components/listTransactions";
import { useTransactionStore } from "@/src/app/store/transactionStore";
import { useEffect } from "react";
import FormTransaction from "./formTransation";

interface TransactionsProps {
  userId: string;
}

export default function Transactions({ userId }: TransactionsProps) {
  const { getTransactions, transactions } = useTransactionStore();

  useEffect(() => {
    getTransactions(userId);
  }, [getTransactions, userId]);

  return (
    <section className="flex flex-col gap-7 max-h-[680px] overflow-auto">
      <div className="w-full">
        <FormTransaction userId={userId} />
      </div>

      <div className="overflow-auto px-4">
        <ListTransactions transactions={transactions} />
      </div>
    </section>
  );
}
