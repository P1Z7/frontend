import classNames from "classnames";
import Image from "next/image";
import { KeyboardEvent, ReactNode, useState } from "react";
import { FieldPath, FieldValues, UseControllerProps, useController } from "react-hook-form";

interface Prop {
  children?: ReactNode;
  placeholder?: string;
  onKeyDown?: (e: KeyboardEvent) => void;
  isEdit?: boolean;
}

type Function = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(
  prop: UseControllerProps<TFieldValues, TName> & Prop,
) => ReactNode;

const InputArea: Function = ({ children, placeholder, onKeyDown, isEdit, ...control }) => {
  const { field } = useController(control);

  return (
    <div className="flex flex-col ">
      <label htmlFor={field.name} className="text-14">
        {children}
      </label>
      <textarea
        id={field.name}
        placeholder={placeholder ?? "입력해주세요."}
        {...field}
        onKeyDown={onKeyDown}
        className={classNames("h-120 rounded-sm bg-gray-100 px-16 py-12", { "border-2 border-blue-700": isEdit })}
      />
      <div className={classNames("text-12 text-[#A2A5AA]", { "text-red-600": field.value.length > 100 })}>{field.value.length} / 100</div>
    </div>
  );
};

export default InputArea;
