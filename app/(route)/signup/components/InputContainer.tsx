import { register } from "module";
import Image from "next/image";
import { ReactNode, useState } from "react";
import { FieldValues, UseControllerProps, useController } from "react-hook-form";

interface Props<T extends FieldValues> extends UseControllerProps<T> {
  children: ReactNode;
  placeholder?: string;
  autocomplete?: string;
  type?: string;
}

function InputContainer<T extends FieldValues>({ children, placeholder, type: initialType = "text", ...controls }: Props<T>) {
  const { field, fieldState } = useController(controls);
  const [type, setType] = useState(initialType);

  const togglePasswordShow = () => {
    if (type === "password") setType("text");
    else if (type === "text") setType("password");
  };

  return (
    <div className="relative">
      <label htmlFor={field.name} className="text-14">
        {children}
      </label>
      <input
        id={field.name}
        placeholder={placeholder}
        type={type}
        {...field}
        className={`border-solid-gray body1-normal placeholder:text-gray-4 focus:border-purple mt-10 h-48 w-full rounded-md bg-blue-50 p-16 text-14 text-black outline-none ${fieldState?.error && "border-red-600"}`}
      />
      {initialType === "password" && (
        <button onClick={togglePasswordShow} type="button" className="absolute right-0 top-48 h-24 w-24 -translate-x-1/2 -translate-y-1/2">
          {<Image src={type === "password" ? "/svgs/icon_closed_eyes_black.svg" : "/svgs/icon_opened_eyes_black.svg"} alt="비밀번호 아이콘" width={12} height={12} />}
        </button>
      )}
      <div className="font-normal mt-4 h-8 text-12 text-red-500">{fieldState?.error?.message}</div>
    </div>
  );
}

export default InputContainer;
