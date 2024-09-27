import { create } from "zustand";
import { createAccount, getAccounts } from "../services/accountServices";
import { Account, AccountFormData } from "../shared/models/account.models";

interface AccountStore {
  accounts: Account[];
  getAccounts: (userId: string) => Promise<void>;
  createAccount: (account: AccountFormData) => Promise<void>;
}

export const useAccountStore = create<AccountStore>((set) => ({
  accounts: [],

  getAccounts: async (userId: string) => {
    const accounts = await getAccounts(userId);
    set({ accounts });
  },

  createAccount: async (account: AccountFormData) => {
    const response = await createAccount(account);
    return response;
  },

  addAccountToState: (account: Account) => {
    set((state) => ({
      accounts: [...state.accounts, account],
    }));
  },
}));
