const BUTTON_TYPE = {
  filled: "bg-main-purple-500 text-white-white border-main-purple-500 disabled:bg-gray-200",
  lined: "bg-main-purple-50 text-main-purple-700 border-main-purple-300",
};

const BUTTON_SIZE = {
  xs: "text-14 rounded-full h-24",
  sm: "text-14 rounded-md h-32",
  md: "text-16 rounded-sm h-40",
  lg: "text-16 rounded-md h-48",
};

interface Props {
  children: string;
  type?: "filled" | "lined";
  size?: "xs" | "sm" | "md" | "lg";
}

const Button = ({ children, type = "lined", size = "lg", ...props }: Props) => {
  return (
    <button className={`flex-center w-full shrink-0 gap-4 border px-16 font-600 ${BUTTON_SIZE[size]} ${BUTTON_TYPE[type]}`} {...props}>
      <p>{children}</p>
    </button>
  );
};

export default Button;
