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
import { ApiError } from "../shared/models/apiError.model";

interface AccountStore {
  accounts: Account[];
  getAccounts: (userId: string) => Promise<void>;
  createAccount: (account: AccountFormData) => Promise<void>;
  deleteAccount: (accountId: string) => Promise<void>;
  updateAccount: (accountId: string, accountName: string) => Promise<void>;
  withdraw: (accountId: string, amount: number) => Promise<void>;
  deposit: (accountId: string, amount: number) => Promise<void>;
  searchedAccount: AccountByName | string | null;
  errorMessage: string;
  searchAccountByName: (accountName: string | null) => Promise<void>;
}

export const useAccountStore = create<AccountStore>((set) => ({
  accounts: [],
  searchedAccount: "",
  errorMessage: "",

  getAccounts: async (userId: string) => {
    const accounts = await getAccounts(userId);
    set({ accounts });
  },

  createAccount: async (account: AccountFormData) => {
    const response = await createAccount(account);
    set((state) => ({
      accounts: [...state.accounts, response],
    }));
    return response;
  },

  deleteAccount: async (accountId: string) => {
    await deleteAccount(accountId);
    set((state) => ({
      accounts: state.accounts.filter((account) => account.id !== accountId),
    }));
  },

  updateAccount: async (accountId: string, accountName: string) => {
    const response = await updateAccount(accountId, accountName);
    set((state) => ({
      accounts: state.accounts.map((account) =>
        account.id === accountId ? { ...account, name: accountName } : account
      ),
    }));
    return response;
  },

  withdraw: async (accountId: string, amount: number) => {
    const response = await withdraw(accountId, amount);
    set((state) => ({
      accounts: state.accounts.map((account) =>
        account.id === accountId
          ? { ...account, balance: account.balance - Number(amount) }
          : account
      ),
    }));
    return response;
  },

  deposit: async (accountId: string, amount: number) => {
    const response = await deposit(accountId, amount);
    set((state) => ({
      accounts: state.accounts.map((account) =>
        account.id === accountId
          ? { ...account, balance: account.balance + Number(amount) }
          : account
      ),
    }));
    return response;
  },

  searchAccountByName: async (accountName: string | null) => {
    try {
      const result = await getAccountByName(accountName);
      set({ searchedAccount: result, errorMessage: "" });
    } catch (error: ApiError | unknown) {
      const apiError = error as ApiError;
      set({
        errorMessage: apiError.response.data.message,
        searchedAccount: null,
      });
    }
  },
}));
