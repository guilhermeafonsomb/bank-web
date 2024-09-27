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
