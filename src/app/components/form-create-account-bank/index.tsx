import { useForm } from "react-hook-form";
import ErrorMessage from "../errorMessage";
import { validationMessages } from "../../shared/utils/messages";
import { Input } from "@headlessui/react";
import Button from "../button";

export interface FormAccount {
  accountName: string;
}

interface FormAccountProps {
  onSubmitData: (data: FormAccount) => void;
}

export default function FormCreateAccountBank({
  onSubmitData,
}: FormAccountProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormAccount>();

  const onSubmit = async (data: FormAccount) => {
    try {
      onSubmitData(data);
    } catch (error) {
      console.log(error, "error");
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full items-end gap-10 md:flex-row"
    >
      <div className="w-full">
        <label className="block mb-2 font-medium" htmlFor="account">
          Nome da conta
        </label>
        <Input
          className="w-full text-slate-950  px-3 py-2 rounded-lg"
          {...register("accountName", { required: true })}
        />

        {errors.accountName && (
          <ErrorMessage message={validationMessages.required} />
        )}
      </div>

      <div className="w-full md:max-w-36">
        <Button variation="primary" type="submit">
          Criar conta
        </Button>
      </div>
    </form>
  );
}
