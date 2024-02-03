import classNames from "classnames";
import { KeyboardEvent, ReactNode } from "react";
import { FieldPath, FieldValues, UseControllerProps, useController } from "react-hook-form";

interface Prop {
  children?: ReactNode;
  placeholder?: string;
  onKeyDown?: (e: KeyboardEvent) => void;
  isEdit?: boolean;
  height?: number;
  hasLimit?: boolean;
}

type Function = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(
  prop: UseControllerProps<TFieldValues, TName> & Prop,
) => ReactNode;

const InputArea: Function = ({ children, placeholder, onKeyDown, isEdit, hasLimit = false, ...control }) => {
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
        className={classNames("h-120 resize-none rounded-sm bg-gray-50 px-16 py-12 text-16 placeholder:text-gray-400 focus:outline focus:outline-1 focus:outline-blue", {
          "outline outline-1 outline-blue": isEdit,
        })}
      />
      {hasLimit && <div className={classNames("text-12 text-[#A2A5AA]", { "text-red-600": field.value.length > 100 })}>{field.value.length} / 100</div>}
    </div>
  );
};

export default InputArea;
