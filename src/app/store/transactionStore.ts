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
import { showToast } from "../shared/utils/toast/feedbackToast";

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
    try {
      const transactions = await getTransactions(userId, filters);
      set({ transactions });
    } catch (error: unknown) {
      showToast("Erro ao carregar transações", "error");
      console.error(error);
    }
  },

  createTransaction: async (transaction: TransactionFormData) => {
    const { accounts } = useAccountStore.getState();

    try {
      const newTransaction = await createTransaction(transaction);

      const fromAccount = accounts.find(
        (account) => account.id === newTransaction.fromAccount
      );
      const toAccount = accounts.find(
        (account) => account.id === newTransaction.toAccount
      );

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

      showToast("Transação criada com sucesso!", "success");
    } catch (error: unknown) {
      showToast("Erro ao criar transação", "error");
      console.error(error);
    }
  },
}));
