import { revalidateTag } from "next/cache";
import { FetchHelper } from "../helpers/fetchHelper";
import { User, UserFormData } from "../shared/models/user.models";

const baseURL = process.env.NEXT_PUBLIC_API_URL;
// const fetchHelper = FetchHelper();

export const createUsers = async (user: UserFormData) => {
  // const response = await fetchHelper.post({
  //   url: `${baseURL}/users`,
  //   body: user,
  //   tags: ["users"],
  // });

  const request = await fetch(`${baseURL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
    next: {
      tags: ["users"],
    },
  });

  revalidateTag("users");

  return request;
};

export const getUsers = async (): Promise<User[]> => {
  // const response = await fetchHelper.get({
  //   url: `${baseURL}/users`,
  //   tags: ["users"],
  // });

  const response = await fetch(`${baseURL}/users`, {
    next: {
      tags: ["users"],
    },
  });

  return response.json();
};
