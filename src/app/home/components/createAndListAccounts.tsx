import { useEffect } from "react";
import FormCreateAccountBank, {
  FormAccount,
} from "../../components/form-create-account-bank";
import ListAccounts from "../../components/listAccounts";
import { useAccountStore } from "../../store/accountStore";

interface CreateAndListAccountsProps {
  userId: string;
}

export default function CreateAndListAccounts({
  userId,
}: CreateAndListAccountsProps) {
  const { getAccounts, accounts } = useAccountStore();

  useEffect(() => {
    getAccounts(userId);
  }, [getAccounts, userId]);

  const handleAccountCreate = (accountData: FormAccount) => {
    console.log(accountData, "accountData");
  };
  return (
    <section className="flex flex-col gap-4">
      <FormCreateAccountBank onSubmitData={handleAccountCreate} />
      <ListAccounts accounts={accounts} />
    </section>
  );
}
