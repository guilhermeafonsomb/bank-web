"use server";
import { FetchHelper } from "../helpers/fetchHelper";
import { User, UserFormData } from "../shared/models/user.models";
import { baseURL } from "../shared/utils/baseUrl";
const fetchHelper = FetchHelper();

export const createUsers = async (user: UserFormData) => {
  const request = await fetchHelper.post({
    url: `${baseURL}/users`,
    body: user,
  });

  return request;
};

export const getUsers = async (): Promise<User[]> => {
  const response = await fetchHelper.get({
    url: `${baseURL}/users`,
  });

  return response;
};
