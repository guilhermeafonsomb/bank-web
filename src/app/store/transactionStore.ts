import { create } from "zustand";
import {
  Transaction,
  TransactionFormData,
} from "../shared/models/transation.models";
import {
  createTransaction,
  getTransactions,
} from "../services/transactionServices";
import { useAccountStore } from "./accountStore";

interface TransactionStore {
  transactions: Transaction[];
  getTransactions: (
    userId: string,
    filters?: {
      fromAccount?: string;
      toAccount?: string;
      minAmount?: number;
      maxAmount?: number;
      startDate?: string;
      endDate?: string;
      type?: string;
    }
  ) => Promise<void>;
  createTransaction: (transaction: TransactionFormData) => Promise<void>;
}

export const useTransactionStore = create<TransactionStore>((set) => ({
  transactions: [],

  getTransactions: async (userId: string, filters) => {
    const transactions = await getTransactions(userId, filters);
    set({ transactions });
  },

  createTransaction: async (transaction: TransactionFormData) => {
    const { accounts } = useAccountStore.getState(); // Obter contas do store

    // Faz o POST da transação com os IDs
    const newTransaction = await createTransaction(transaction);

    // Busca os nomes das contas a partir dos IDs
    const fromAccount = accounts.find(
      (account) => account.id === newTransaction.fromAccount
    );
    const toAccount = accounts.find(
      (account) => account.id === newTransaction.toAccount
    );

    // Atualiza o estado com os nomes das contas
    set((state) => ({
      transactions: [
        {
          ...newTransaction,
          fromAccountName: fromAccount?.name || "",
          toAccountName: toAccount?.name || "",
        },
        ...state.transactions,
      ].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    }));
  },
}));
