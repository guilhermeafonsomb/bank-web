import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variation?:
    | "primary"
    | "secondary"
    | "primary-ghost"
    | "secondary-ghost"
    | "ghost";
}

export default function Button({
  children,
  variation = "primary",
  ...props
}: Readonly<ButtonProps>) {
  return (
    <button
      className={clsx("w-full bg-blue-500 font-medium px-4 py-2 rounded-lg ", {
        "bg-blue-500 text-gray-300": variation === "primary",
        "bg-red-500 text-gray-300": variation === "secondary",
        "bg-transparent text-blue-500 ": variation === "primary-ghost",
        "bg-transparent text-red-500": variation === "secondary-ghost",
        "bg-transparent text-gray-300": variation === "ghost",
      })}
      {...props}
    >
      {children}
    </button>
  );
}
