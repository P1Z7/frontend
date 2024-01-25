import Image from "next/image";
import { ReactNode, useState } from "react";
import { FieldValues, UseControllerProps, useController } from "react-hook-form";

interface Props<T extends FieldValues> extends UseControllerProps<T> {
  children: ReactNode;
  placeholder?: string;
  autoComplete?: string;
  hint?: string;
  type?: string;
}

function InputContainer<T extends FieldValues>({ children, placeholder, autoComplete, hint, type: initialType = "text", ...controls }: Props<T>) {
  const { field, fieldState } = useController(controls);
  const [type, setType] = useState(initialType);

  const handlePasswordShow = () => {
    if (type === "password") setType("text");
    else if (type === "text") setType("password");
  };

  const handleXIconClick = () => {
    field.onChange("");
  };

  return (
    <div className="relative">
      <label htmlFor={field.name} className="text-14">
        {children}
      </label>
      <input
        id={field.name}
        placeholder={placeholder}
        autoComplete={autoComplete}
        type={type}
        {...field}
        className={`border-solid-gray body1-normal placeholder:text-gray-4 focus:border-purple mt-10 h-48 w-full rounded-md bg-blue-50 p-16 text-14 text-black outline-none `}
      />
      {initialType === "password" && (
        <button onClick={handlePasswordShow} type="button" className="absolute right-0 top-44 h-24 w-24 -translate-x-1/2 -translate-y-1/2">
          {<Image src={type === "password" ? "/icon/closed-eyes_black.svg" : "/icon/opened-eyes_black.svg"} alt="비밀번호 아이콘" width={16} height={16} />}
        </button>
      )}
      {initialType !== "password" && (
        <button type="button" className="absolute right-0 top-44 h-24 w-24 -translate-x-1/2 -translate-y-1/2" onClick={handleXIconClick}>
          <Image src="/icon/x_gray.svg" alt="초기화 버튼" width={16} height={16} />
        </button>
      )}
      <div className={`font-normal mt-4 h-8 text-12 ${fieldState?.error ? "text-red-500" : "text-gray-400"}`}>{fieldState?.error?.message || hint}</div>
    </div>
  );
}

export default InputContainer;
