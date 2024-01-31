import React, { ReactElement, ReactNode, cloneElement } from "react";

interface IconProps {
  width: string;
  height: string;
  viewBox: string;
  stroke: string;
}

interface Props {
  children: ReactNode;
  type?: "filled" | "lined";
  size?: "sm" | "md" | "lg" | "xl";
  onClick?: () => void;
  disabled?: boolean;
  heart?: boolean;
  icon?: boolean;
}

const Button = ({ children, type = "filled", size = "lg", onClick, disabled = false, ...props }: Props) => {
  const Children =
    React.Children.count(children) === 1
      ? children
      : React.Children.map(children, (child, index) => {
          if (index === 0 && React.isValidElement(child)) {
            const clone: IconProps = {
              width: "20",
              height: "20",
              viewBox: "0 0 24 24",
              stroke: disabled ? ICON_COLOR[type].disabled : ICON_COLOR[type].stroke,
            };

            return cloneElement(child as ReactElement, {
              ...clone,
            });
          }
          return child;
        });

  return (
    <button className={`flex-center w-full shrink-0 gap-4 border px-16 font-600 ${BUTTON_SIZE[size]} ${BUTTON_TYPE[type]}`} onClick={onClick} disabled={disabled} {...props}>
      {Children}
    </button>
  );
};

export default Button;

const BUTTON_TYPE = {
  filled: "bg-main-purple-500 text-white-white border-main-purple-500 disabled:bg-gray-200 disabled:border-gray-200",
  lined: "bg-main-purple-50 text-main-purple-700 border-main-purple-300 disabled:bg-gray-50 disabled:text-gray-700 disabled:border-gray-400",
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
    disabled: "#494F5A",
  },
};
