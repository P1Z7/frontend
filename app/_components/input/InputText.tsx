import classNames from "classnames";
import Image from "next/image";
import { KeyboardEvent, ReactNode, useState } from "react";
import { FieldPath, FieldValues, UseControllerProps, useController } from "react-hook-form";

interface Prop {
  children?: ReactNode;
  type?: "text" | "password";
  horizontal?: boolean;
  placeholder?: string;
  autoComplete?: string;
  hint?: string;
  maxLength?: number;
  hidden?: boolean;
  readOnly?: boolean;
  required?: boolean;
  disabled?: boolean;
  onKeyDown?: (e: KeyboardEvent) => void;
  onClick?: () => void;
  isEdit?: boolean;
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
  maxLength,
  hidden,
  required,
  readOnly,
  disabled,
  onClick,
  onKeyDown,
  isEdit,
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

  return (
    <div className={`${horizontal && "flex gap-28"}`}>
      <label htmlFor={field.name} className={`text-14 ${horizontal && "mt-20"}`}>
        {children}
        <span className="ml-4 text-red">{required && "*"}</span>
      </label>
      <div className={`relative ${horizontal && "flex-1"}`}>
        <input
          id={field.name}
          type={type}
          placeholder={placeholder ?? "입력해주세요."}
          autoComplete={autoComplete ?? "off"}
          required={required ?? false}
          readOnly={readOnly ?? false}
          disabled={disabled ?? false}
          onClick={onClick}
          onKeyDown={onKeyDown}
          {...field}
          className={classNames(
            "mt-8 h-48 w-full rounded-sm bg-gray-50 px-16 py-12 text-16 text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-1 focus:outline-blue",
            { "outline outline-1 outline-red": fieldState.error },
            { hidden: hidden ?? false },
            { "border border-blue outline-none": isEdit },
          )}
        />
        {initialType === "password" && (
          <button onClick={handlePasswordShow} onKeyDown={onKeyDown} type="button" className="flex-center absolute right-16 top-20 h-24 w-24">
            {<Image src={type === "password" ? "/icon/closed-eyes_black.svg" : "/icon/opened-eyes_black.svg"} alt="비밀번호 아이콘" width={16} height={16} />}
          </button>
        )}
        {initialType !== "password" && !hidden && (
          <button onClick={handleDelete} onKeyDown={onKeyDown} type="button" className="absolute right-16 top-24 h-16 w-16">
            <Image src="/icon/x_gray.svg" alt="초기화 버튼" width={16} height={16} />
          </button>
        )}
        <div className="flex gap-8">
          {maxLength ? <span className={classNames("mt-4 h-8", { "text-red": field.value.length > maxLength })}>{`(${field.value.length}/${maxLength})`}</span> : null}
          <p className={`font-normal mt-4 h-12 text-12 ${fieldState.error ? "text-red" : "text-gray-400"}`}>{fieldState?.error?.message || hint}</p>
        </div>
      </div>
    </div>
  );
};

export default InputText;
