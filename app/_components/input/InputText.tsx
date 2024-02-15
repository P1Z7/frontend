import classNames from "classnames";
import { InputHTMLAttributes, KeyboardEvent, ReactNode, useCallback, useMemo, useState } from "react";
import { FieldPath, FieldValues, UseControllerProps, useController } from "react-hook-form";
import ClosedEye from "@/public/icon/closed-eyes_gray.svg";
import OpenedEye from "@/public/icon/opened-eyes_gray.svg";
import ClearIcon from "@/public/icon/x_gray.svg";

interface Prop extends InputHTMLAttributes<HTMLInputElement> {
  children?: ReactNode;
  type?: "text" | "password";
  horizontal?: boolean;
  hint?: string;
  onKeyDown?: (e: KeyboardEvent) => void;
  onClick?: () => void;
  isEdit?: boolean;
  isSuccess?: boolean;
  noButton?: boolean;
}

type Function = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(
  prop: UseControllerProps<TFieldValues, TName> & Prop,
) => ReactNode;

const InputText: Function = ({
  children,
  type: initialType,
  horizontal,
  placeholder,
  autoComplete,
  hint,
  hidden,
  required,
  readOnly,
  disabled,
  onClick,
  onKeyDown,
  isEdit,
  isSuccess,
  noButton,
  ...control
}) => {
  const { field, fieldState } = useController(control);
  const [type, setType] = useState(initialType ?? "text");

  const handlePasswordShow = () => {
    setType((prev) => (prev === "password" ? "text" : "password"));
  };

  const handleDelete = () => {
    field.onChange("");
  };

  const Label = useCallback(() => {
    if (children) {
      return (
        <label htmlFor={field.name} className={`flex items-center text-16 ${horizontal && "mt-20"}`}>
          {children}
          {required && <span className="ml-4 text-sub-red">*</span>}
          {isEdit && <span className="ml-4 text-12 font-600 text-blue">수정됨</span>}
        </label>
      );
    }
    return null;
  }, [children, required, isEdit]);

  const Button = useCallback(() => {
    if (noButton || hidden) {
      return null;
    }
    if (initialType === "password") {
      return (
        <button onClick={handlePasswordShow} onKeyDown={onKeyDown} type="button" className="flex-center absolute right-16 top-20 h-24 w-24">
          {type === "password" ? <ClosedEye /> : <OpenedEye />}
        </button>
      );
    }
    return (
      <button onClick={handleDelete} onKeyDown={onKeyDown} type="button" className="flex-center absolute right-16 top-20 h-24 w-24">
        <ClearIcon />
      </button>
    );
  }, [type]);

  const ErrorField = useCallback(() => {
    return (
      <>
        {(!!fieldState.error || hint) && (
          <div className="mt-4 flex h-12">
            <p className={`font-normal text-12 ${fieldState.error ? "text-red" : isSuccess ? "text-sub-skyblue" : "text-gray-500"}`}>{fieldState?.error?.message || hint}</p>
          </div>
        )}
      </>
    );
  }, [fieldState.error, hint]);

  return (
    <>
      {!hidden && (
        <div className={`w-full ${horizontal && "flex gap-28"}`}>
          <Label />
          <div className={`relative ${horizontal && "flex-1"}`}>
            <input
              id={field.name}
              type={type}
              placeholder={placeholder ?? "입력해주세요."}
              autoComplete={autoComplete ?? "off"}
              hidden={hidden ?? false}
              readOnly={readOnly ?? false}
              disabled={disabled ?? false}
              onClick={onClick}
              onKeyDown={onKeyDown}
              {...field}
              className={classNames(
                "focus:border-1 mt-8 h-48 w-full rounded-sm bg-gray-50 px-16 py-12 pr-36 text-16 text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-1 focus:outline-blue",
                { "outline outline-1 outline-red": fieldState.error },
              )}
            />
            <Button />
            <ErrorField />
          </div>
        </div>
      )}
    </>
  );
};

export default InputText;
