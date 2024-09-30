import { FetchHelper } from "../helpers/fetchHelper";
import {
  Account,
  AccountFormData,
  AccountByName,
} from "../shared/models/account.models";
import { ApiError } from "../shared/models/apiError.model";
import { baseURL } from "../shared/utils/baseUrl";

const fetchHelper = FetchHelper();

export const createAccount = async (account: AccountFormData) => {
  try {
    const request = await fetchHelper.post({
      url: `${baseURL}/accounts`,
      body: account,
    });
    return request;
  } catch (error) {
    console.error("Error creating account:", error);
    throw error;
  }
};

export const getAccounts = async (userId: string): Promise<Account[]> => {
  try {
    const response = await fetchHelper.get({
      url: `${baseURL}/accounts/user/${userId}`,
    });
    return response;
  } catch (error) {
    console.error("Error fetching accounts:", error);
    throw error;
  }
};

export const deleteAccount = async (accountId: string) => {
  try {
    const response = await fetchHelper.exclude({
      url: `${baseURL}/accounts/${accountId}`,
    });
    return response;
  } catch (error) {
    console.error("Error deleting account:", error);
    throw error;
  }
};

export const updateAccount = async (accountId: string, accountName: string) => {
  try {
    const response = await fetchHelper.put({
      url: `${baseURL}/accounts/${accountId}`,
      body: { name: accountName },
    });
    return response;
  } catch (error) {
    console.error("Error updating account:", error);
    throw error;
  }
};

export const withdraw = async (accountId: string, amount: number) => {
  try {
    const response = await fetchHelper.put({
      url: `${baseURL}/accounts/${accountId}/withdraw`,
      body: { amount },
    });
    return response;
  } catch (error) {
    console.error("Error withdrawing amount:", error);
    throw error;
  }
};

export const deposit = async (accountId: string, amount: number) => {
  try {
    const response = await fetchHelper.put({
      url: `${baseURL}/accounts/${accountId}/deposit`,
      body: { amount },
    });
    return response;
  } catch (error) {
    console.error("Error depositing amount:", error);
    throw error;
  }
};

export const getAccountByName = async (
  accountName: string | null
): Promise<AccountByName | null> => {
  try {
    const response = await fetchHelper.get({
      url: `${baseURL}/accounts/name/${accountName}`,
    });
    return response;
  } catch (error: ApiError | unknown) {
    if ((error as ApiError).response?.status === 400) {
      return null;
    }
    console.error("Error fetching account by name:", error);
    throw error;
  }
};
