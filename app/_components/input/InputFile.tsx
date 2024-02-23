import classNames from "classnames";
import { ChangeEvent, KeyboardEvent, ReactNode } from "react";
import { FieldPath, FieldValues, UseControllerProps, useController } from "react-hook-form";
import PlusIcon from "@/public/icon/add-file.svg";

interface Props {
  children?: ReactNode;
}

type Function = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(
  prop: UseControllerProps<TFieldValues, TName> & Props,
) => ReactNode;

const InputFile: Function = ({ children, ...props }) => {
  const { field, fieldState } = useController(props);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    field.onChange({ target: { value: e.target.files, name: field.name } });
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const target = e.target as HTMLElement;
      const input = target.nextElementSibling as HTMLElement;
      if (input) {
        input.click();
      }
    }
  };

  return (
    <div>
      {children && <p className="mb-8 text-14">{children}</p>}
      <label className="flex h-120 w-120 cursor-pointer flex-col items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center gap-8">
          <PlusIcon onKeyDown={handleKeyDown} tabIndex={0} width="32" height="32" stroke="#7E8695" />
          <div className="text-14 font-500 text-gray-500">사진 추가하기</div>
        </div>
        <input type="file" name={field.name} ref={field.ref} multiple onChange={handleChange} className="hidden" accept="image/*" />
      </label>
      {fieldState.error && (
        <p className={classNames(`font-normal mt-4 h-8 text-12`, { "text-red-500": fieldState.error, "text-gray-400": !fieldState.error })}>{fieldState?.error?.message}</p>
      )}
    </div>
  );
};
export default InputFile;
