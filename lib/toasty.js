import { toast } from "react-toastify";

export function toasty(type, message, config) {
  if (message instanceof Error) {
    message = message.response?.data?.message || message?.message;
  }
  toast[type](message, {
    autoClose: 3000,
    hideProgressBar: true,
    position: "top-center",
    theme: "light",
    ...config,
  });
}
