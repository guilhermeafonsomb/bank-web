import { create } from "zustand";
import {
  Transaction,
  TransactionFormData,
} from "../shared/models/transation.models";
import {
  createTransaction,
  getTransactions,
} from "../services/transactionServices";

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
    const newTransaction = await createTransaction(transaction);
    set((state) => ({
      transactions: [newTransaction, ...state.transactions].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    }));
  },
}));
