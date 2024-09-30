import { create } from "zustand";
import {
  createAccount,
  getAccounts,
  deleteAccount,
  updateAccount,
  withdraw,
  deposit,
  getAccountByName,
} from "../services/accountServices";
import {
  Account,
  AccountByName,
  AccountFormData,
} from "../shared/models/account.models";
import { showToast } from "../shared/utils/toast/feedbackToast";

interface AccountStore {
  accounts: Account[];
  getAccounts: (userId: string) => Promise<void>;
  createAccount: (account: AccountFormData) => Promise<void>;
  deleteAccount: (accountId: string) => Promise<void>;
  updateAccount: (accountId: string, accountName: string) => Promise<void>;
  withdraw: (accountId: string, amount: number) => Promise<void>;
  deposit: (accountId: string, amount: number) => Promise<void>;
  searchedAccount: AccountByName | string | null;
  searchAccountByName: (accountName: string) => Promise<void>;
}

export const useAccountStore = create<AccountStore>((set) => ({
  accounts: [],
  searchedAccount: null,

  getAccounts: async (userId: string) => {
    try {
      const accounts = await getAccounts(userId);
      set({ accounts });
    } catch (error: unknown) {
      showToast("Erro ao carregar as contas", "error");
      console.error(error);
    }
  },

  createAccount: async (account: AccountFormData) => {
    try {
      const response = await createAccount(account);
      set((state) => ({
        accounts: [...state.accounts, response],
      }));
      showToast("Conta criada com sucesso", "success");
    } catch (error: unknown) {
      showToast("Erro ao criar a conta", "error");
      console.error(error);
    }
  },

  deleteAccount: async (accountId: string) => {
    try {
      await deleteAccount(accountId);
      set((state) => ({
        accounts: state.accounts.filter((account) => account.id !== accountId),
      }));
      showToast("Conta excluída com sucesso", "success");
    } catch (error: unknown) {
      showToast("Erro ao excluir a conta", "error");
      console.error(error);
    }
  },

  updateAccount: async (accountId: string, accountName: string) => {
    try {
      await updateAccount(accountId, accountName);
      set((state) => ({
        accounts: state.accounts.map((account) =>
          account.id === accountId ? { ...account, name: accountName } : account
        ),
      }));
      showToast("Conta atualizada com sucesso", "success");
    } catch (error: unknown) {
      showToast("Erro ao atualizar a conta", "error");
      console.error(error);
    }
  },

  withdraw: async (accountId: string, amount: number) => {
    try {
      await withdraw(accountId, amount);
      set((state) => ({
        accounts: state.accounts.map((account) =>
          account.id === accountId
            ? { ...account, balance: account.balance - Number(amount) }
            : account
        ),
      }));
      showToast("Saque realizado com sucesso", "success");
    } catch (error: unknown) {
      showToast("Erro ao realizar o saque", "error");
      console.error(error);
    }
  },

  deposit: async (accountId: string, amount: number) => {
    try {
      await deposit(accountId, amount);
      set((state) => ({
        accounts: state.accounts.map((account) =>
          account.id === accountId
            ? { ...account, balance: account.balance + Number(amount) }
            : account
        ),
      }));
      showToast("Depósito realizado com sucesso", "success");
    } catch (error: unknown) {
      showToast("Erro ao realizar o depósito", "error");
      console.error(error);
    }
  },

  searchAccountByName: async (accountName: string) => {
    try {
      const result = await getAccountByName(accountName);
      set({ searchedAccount: result });
    } catch (error: unknown) {
      set({ searchedAccount: null });
      showToast("Conta não encontrada", "error");
      console.error(error);
    }
  },
}));
