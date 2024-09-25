import { FetchHelper } from "../helpers/fetchHelper";
import { User, UserFormData } from "../shared/models/user.models";

const baseURL = process.env.NEXT_PUBLIC_API_URL;
const fetchHelper = FetchHelper();

export const createUsers = async (user: UserFormData): Promise<User> => {
  const response = await fetchHelper.post({
    url: `${baseURL}/users`,
    body: user,
    tags: ["users"],
  });

  return response;
};

export const getUsers = async (): Promise<User[]> => {
  const response = await fetchHelper.get({
    url: `${baseURL}/users`,
    tags: ["users"],
  });

  return response;
};
