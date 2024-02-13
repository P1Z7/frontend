import React, { ButtonHTMLAttributes, ReactNode, cloneElement } from "react";

interface IconProps {
  width: string;
  height: string;
  viewBox: string;
  stroke: string;
}

interface Props {
  children: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "filled" | "lined" | "linedGray";
  size?: "sm" | "md" | "lg" | "xl" | "free";
  isDisabled?: boolean;
  isSubmit?: boolean;
  style?: string;
}

const Button = ({ children, type = "filled", size = "lg", onClick, isDisabled = false, style = "", isSubmit = false, ...props }: Props) => {
  const Children =
    React.Children.count(children) === 1
      ? children
      : React.Children.map(children, (child, index) => {
          if (index === 0 && React.isValidElement(child)) {
            const clone: IconProps = {
              width: "20",
              height: "20",
              viewBox: "0 0 24 24",
              stroke: isDisabled ? ICON_COLOR[type].disabled : ICON_COLOR[type].stroke,
            };

            return cloneElement(child, {
              ...clone,
            });
          }
          return child;
        });

  return (
    <button
      type={isSubmit ? "submit" : "button"}
      className={`flex-center w-full shrink-0 gap-4 border px-16 font-600 ${size === "free" ? style : BUTTON_SIZE[size]} ${BUTTON_TYPE[type]}`}
      onClick={onClick}
      disabled={isDisabled}
      {...props}
    >
      {Children}
    </button>
  );
};

export default Button;

const BUTTON_DISABLED = "disabled:text-white-white disabled:bg-gray-200 disabled:border-gray-200";

const BUTTON_TYPE = {
  filled: `bg-main-pink-500 text-white-white border-main-pink-500 disabled:bg-gray-200 disabled:border-gray-200 ${BUTTON_DISABLED}`,
  lined: `bg-main-pink-50 text-main-pink-white border-main-pink-300 ${BUTTON_DISABLED}`,
  linedGray: `bg-gray-50 text-gray-700 border-gray-400 disabled:bg-gray-200 disabled:border-gray-200 ${BUTTON_DISABLED}`,
};

const BUTTON_SIZE = {
  sm: "text-14 rounded-md h-32",
  md: "text-14 rounded-sm h-40",
  lg: "text-16 rounded-md h-48",
  xl: "text-16 rounded-md h-56",
};

const ICON_COLOR = {
  filled: {
    stroke: "white",
    disabled: "white",
  },
  lined: {
    stroke: "#5c48b0",
    disabled: "white",
  },
  linedGray: {
    stroke: "#494F5A",
    disabled: "white",
  },
};
