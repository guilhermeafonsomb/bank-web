interface TagTypeTransferProps {
  type: "transferReceived" | "transferSent";
}

export default function TagTypeTransfer({ type }: TagTypeTransferProps) {
  const getTypeTranslation = (type: string) => {
    switch (type) {
      case "transferReceived":
        return { label: "Recebida", color: "text-green-500" };
      case "transferSent":
        return { label: "Enviada", color: "text-blue-500" };
      default:
        return { label: "", color: "" };
    }
  };

  const { label, color } = getTypeTranslation(type);

  return <span className={color}>{label}</span>;
}
