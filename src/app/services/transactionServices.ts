import { FetchHelper } from "../helpers/fetchHelper";
import {
  Transaction,
  TransactionFormData,
} from "../shared/models/transation.models";
import { baseURL } from "../shared/utils/baseUrl";

const fetchHelper = FetchHelper();

export const createTransaction = async (transaction: TransactionFormData) => {
  try {
    const request = await fetchHelper.post({
      url: `${baseURL}/transactions`,
      body: transaction,
    });
    return request;
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw error;
  }
};

export const getTransactions = async (
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
): Promise<Transaction[]> => {
  try {
    const queryParams = new URLSearchParams();

    if (filters?.fromAccount)
      queryParams.append("fromAccount", filters.fromAccount);
    if (filters?.toAccount) queryParams.append("toAccount", filters.toAccount);
    if (filters?.minAmount)
      queryParams.append("minAmount", filters.minAmount.toString());
    if (filters?.maxAmount)
      queryParams.append("maxAmount", filters.maxAmount.toString());
    if (filters?.startDate) queryParams.append("startDate", filters.startDate);
    if (filters?.endDate) queryParams.append("endDate", filters.endDate);
    if (filters?.type) queryParams.append("type", filters.type);

    const queryString = queryParams.toString();

    const url = `${baseURL}/transactions/user/${userId}?${queryString}`;

    const response = await fetchHelper.get({
      url,
    });
    return response;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};
