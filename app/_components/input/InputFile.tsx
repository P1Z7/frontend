import Image from "next/image";
import { ChangeEvent, ReactNode } from "react";
import { FieldPath, FieldValues, UseControllerProps, useController } from "react-hook-form";
import defaultImg from "@/public/icon/add-image_gray.svg";

type Function = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(
  prop: UseControllerProps<TFieldValues, TName>,
) => ReactNode;

const InputFile: Function = (props) => {
  const { field } = useController(props);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    field.onChange({ target: { value: e.target.files, name: field.name } });
  };

  return (
    <label className="relative h-100 w-100 cursor-pointer rounded-full" tabIndex={0}>
      <input type="file" name={field.name} ref={field.ref} multiple onChange={handleChange} className="hidden" accept="image/*" />
      <Image src={defaultImg} fill alt="이미지 추가 버튼" className="rounded-full object-cover" />
    </label>
  );
};
export default InputFile;
