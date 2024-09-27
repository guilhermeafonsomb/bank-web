interface ErrorMessageProps {
  message?: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return <p className="mt-2 text-red-500">{message}</p>;
}
