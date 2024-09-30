import { create } from "zustand";
import { User, UserFormData } from "../shared/models/user.models";
import { createUsers, getUsers } from "../services/userServices";
import { showToast } from "../shared/utils/toast/feedbackToast";

interface UserStore {
  users: User[];
  chosenUser: User | null;
  errorMessage: string;
  getUsers: () => Promise<void>;
  setUser: (user: User) => void;
  loadUserFromLocalStorage: () => void;
  createUser: (user: UserFormData) => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  chosenUser: null,
  errorMessage: "",

  getUsers: async () => {
    try {
      const users = await getUsers();
      set({ users, errorMessage: "" });
    } catch (error: unknown) {
      showToast("Erro ao carregar usuários", "error");
      console.error(error);
    }
  },

  setUser: (user: User) => {
    localStorage.removeItem("user");
    localStorage.setItem("user", JSON.stringify(user));
    set({ chosenUser: user });
    showToast("Usuário selecionado com sucesso!", "success");
  },

  loadUserFromLocalStorage: () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      set({ chosenUser: JSON.parse(storedUser) });
    }
  },

  createUser: async (user: UserFormData) => {
    try {
      const response = await createUsers(user);
      set((state) => ({
        users: [...state.users, response],
        errorMessage: "",
      }));
      showToast("Usuário criado com sucesso!", "success");
      return response;
    } catch (error: unknown) {
      showToast("Erro ao criar usuário", "error");
      console.error(error);
    }
  },
}));
