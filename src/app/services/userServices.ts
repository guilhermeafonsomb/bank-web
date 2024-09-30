"use server";
import { FetchHelper } from "../helpers/fetchHelper";
import { User, UserFormData } from "../shared/models/user.models";
import { baseURL } from "../shared/utils/baseUrl";
const fetchHelper = FetchHelper();

export const createUsers = async (user: UserFormData) => {
  try {
    const request = await fetchHelper.post({
      url: `${baseURL}/users`,
      body: user,
    });
    return request;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await fetchHelper.get({
      url: `${baseURL}/users`,
    });
    return response;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
