import { create } from "zustand";
import {
  createAccount,
  getAccounts,
  deleteAccount,
  updateAccount,
} from "../services/accountServices";
import { Account, AccountFormData } from "../shared/models/account.models";

interface AccountStore {
  accounts: Account[];
  getAccounts: (userId: string) => Promise<void>;
  createAccount: (account: AccountFormData) => Promise<void>;
  deleteAccount: (accountId: string) => Promise<void>;
  updateAccount: (accountId: string, account: AccountFormData) => Promise<void>;
}

export const useAccountStore = create<AccountStore>((set) => ({
  accounts: [],

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

  updateAccount: async (accountId: string, account: AccountFormData) => {
    const response = await updateAccount(accountId, account);
    return response;
  },
}));
