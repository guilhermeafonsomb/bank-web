export interface TransactionFormData {
  fromAccount: string;
  toAccount: string;
  amount: number;
  userId: string;
  type: string;
}

export interface Transaction {
  id: string;
  fromAccountName: string;
  toAccountName: string;
  amount: number;
  createdAt: string;
  userId: string;
  type: string;
}
