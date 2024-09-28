import { create } from "zustand";
import { User, UserFormData } from "../shared/models/user.models";
import { createUsers, getUsers } from "../services/userServices";

interface ChosenUser {
  cpf: string;
  userId: string;
}

interface UserStore {
  users: User[];
  chosenUser: ChosenUser | null;
  getUsers: () => Promise<void>;
  setUser: (user: ChosenUser) => void;
  loadUserFromLocalStorage: () => void;
  createUser: (user: UserFormData) => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  chosenUser: null,

  getUsers: async () => {
    const users = await getUsers();
    set({ users });
  },

  setUser: (user: ChosenUser) => {
    localStorage.removeItem("user");
    localStorage.setItem("user", JSON.stringify(user));
    set({ chosenUser: user });
  },

  loadUserFromLocalStorage: () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      set({ chosenUser: JSON.parse(storedUser) });
    }
  },

  createUser: async (user: UserFormData) => {
    const response = await createUsers(user);
    set((state) => ({
      users: [...state.users, response],
    }));
    return response;
  },
}));
