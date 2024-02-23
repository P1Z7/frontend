import toast from "react-hot-toast";

type Message = Parameters<typeof toast>[0];

const TOAST_CSS = {
  className: "text-16 font-600",
};

export const openToast = (message: Message) => {
  toast(message, TOAST_CSS);
};

openToast.error = (message: Message) => {
  toast.error(message, TOAST_CSS);
};

openToast.success = (message: Message) => {
  toast.success(message, TOAST_CSS);
};
