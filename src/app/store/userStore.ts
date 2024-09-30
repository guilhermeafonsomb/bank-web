import { create } from "zustand";
import { User, UserFormData } from "../shared/models/user.models";
import { createUsers, getUsers } from "../services/userServices";

interface UserStore {
  users: User[];
  chosenUser: User | null;
  getUsers: () => Promise<void>;
  setUser: (user: User) => void;
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

  setUser: (user: User) => {
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
