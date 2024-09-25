import { create } from "zustand";
import { User } from "../shared/models/user.models";
import { getUsers } from "../services/userServices";

interface UserStore {
  users: User[];
  userCpf: string | null;
  getUsers: () => Promise<void>;
  setUser: (userCpf: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  userCpf: null,

  getUsers: async () => {
    const users = await getUsers();
    set({ users });
  },

  setUser: (userCpf: string) => {
    localStorage.removeItem("userCpf");
    localStorage.setItem("userCpf", JSON.stringify(userCpf));
    set({ userCpf });
  },

  loadUserFromLocalStorage: () => {
    const storedUser = localStorage.getItem("userCpf");
    if (storedUser) {
      set({ userCpf: JSON.parse(storedUser) });
    }
  },
}));
