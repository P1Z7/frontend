import classNames from "classnames";
import Image from "next/image";
import { ChangeEvent, Dispatch, KeyboardEvent, ReactNode, SetStateAction } from "react";
import { FieldPath, FieldValues, UseControllerProps, useController } from "react-hook-form";

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
      <p className="mb-8 text-14">{children}</p>
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-full">
        <Image onKeyDown={handleKeyDown} src="/icon/add-image_gray.svg" alt="이미지 추가 버튼" tabIndex={0} className="rounded-full object-cover" width={70} height={70} />
        <input type="file" name={field.name} ref={field.ref} multiple onChange={handleChange} className="hidden" accept="image/*" />
        <p className={classNames(`font-normal mt-4 h-8 text-12`, { "text-red-500": fieldState.error, "text-gray-400": !fieldState.error })}>{fieldState?.error?.message}</p>
      </label>
    </div>
  );
};
export default InputFile;
