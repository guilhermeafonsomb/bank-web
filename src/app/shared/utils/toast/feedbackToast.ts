import { toast } from "react-toastify";

export const showToast = (message: string, type: "success" | "error") => {
  const color = type === "success" ? "#22C55E" : "#EF4444";
  toast(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    style: { backgroundColor: color, color: "#fff" },
  });
};
