import Image from "next/image";
import { ChangeEvent, Dispatch, KeyboardEvent, ReactNode, SetStateAction } from "react";
import { FieldPath, FieldValues, UseControllerProps, useController } from "react-hook-form";
import defaultImg from "@/public/icon/add-image_gray.svg";

interface Props {
  children?: ReactNode;
  setState: Dispatch<SetStateAction<File[]>>;
}

type Function = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(
  prop: UseControllerProps<TFieldValues, TName> & Props,
) => ReactNode;

const InputFile: Function = ({ children, setState, ...props }) => {
  const { field } = useController(props);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    field.onChange({ target: { value: e.target.files, name: field.name } });
    if (!e.target.files) {
      return;
    }
    const list: File[] = [];
    for (let i = 0; i < e.target.files.length; i++) {
      list.push(e.target.files[i]);
    }
    setState((prev) => [...prev, ...list]);
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
      <label className="flex cursor-pointer justify-center rounded-full">
        <Image onKeyDown={handleKeyDown} src={defaultImg} alt="이미지 추가 버튼" tabIndex={0} className="rounded-full object-cover" />
        <input type="file" name={field.name} ref={field.ref} multiple onChange={handleChange} className="hidden" accept="image/*" />
      </label>
    </div>
  );
};
export default InputFile;
