import { FetchHelper } from "../helpers/fetchHelper";
import { Account, AccountFormData } from "../shared/models/account.models";
import { baseURL } from "../shared/utils/baseUrl";

const fetchHelper = FetchHelper();

export const createAccount = async (account: AccountFormData) => {
  const request = await fetchHelper.post({
    url: `${baseURL}/accounts`,
    body: account,
  });

  return request;
};

export const getAccounts = async (userId: string): Promise<Account[]> => {
  const response = await fetchHelper.get({
    url: `${baseURL}/accounts/user/${userId}`,
  });

  return response;
};

export const deleteAccount = async (accountId: string) => {
  const response = await fetchHelper.exclude({
    url: `${baseURL}/accounts/${accountId}`,
  });

  return response;
};

export const updateAccount = async (accountId: string, accountName: string) => {
  const response = await fetchHelper.put({
    url: `${baseURL}/accounts/${accountId}`,
    body: { name: accountName },
  });

  return response;
};

export const withdraw = async (accountId: string, amount: number) => {
  const response = await fetchHelper.put({
    url: `${baseURL}/accounts/${accountId}/withdraw`,
    body: { amount },
  });

  return response;
};

export const deposit = async (accountId: string, amount: number) => {
  const response = await fetchHelper.put({
    url: `${baseURL}/accounts/${accountId}/deposit`,
    body: { amount },
  });

  return response;
};
