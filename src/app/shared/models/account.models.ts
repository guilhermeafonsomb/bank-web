export interface AccountFormData {
  name: string;
  userId: string;
}

export interface Account {
  id: string;
  name: string;
  balance: number;
  userId: string;
}

export interface AccountByName {
  name: string;
  id: string;
}
