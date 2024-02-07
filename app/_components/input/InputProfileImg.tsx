import classNames from "classnames";
import { ChangeEvent, KeyboardEvent, ReactNode } from "react";
import { FieldPath, FieldValues, UseControllerProps, useController } from "react-hook-form";
import EditIcon from "@/public/icon/pencil.svg";

interface Props {
  children?: ReactNode;
  hasProfile?: boolean;
}

type Function = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(
  prop: UseControllerProps<TFieldValues, TName> & Props,
) => ReactNode;

const InputProfileImg: Function = ({ children, hasProfile, ...props }) => {
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
    <div className="flex-center flex-col gap-8">
      <h2 className="w-full text-16 text-gray-900">프로필 사진</h2>
      <div className="relative flex flex-col gap-8">
        {children}
        <label>
          {hasProfile ? (
            <div
              onKeyDown={handleKeyDown}
              tabIndex={0}
              className="flex-center absolute right-0 top-0 h-28 w-28 cursor-pointer rounded-md border border-white-black bg-main-pink-500"
            >
              <EditIcon />
            </div>
          ) : (
            <div
              onKeyDown={handleKeyDown}
              tabIndex={0}
              className="flex-center h-32 w-100 cursor-pointer rounded-sm border border-gray-400 bg-gray-50 px-16 text-14 font-600 text-gray-700"
            >
              이미지 등록
            </div>
          )}
          <input type="file" name={field.name} ref={field.ref} multiple onChange={handleChange} className="hidden" accept="image/*" />
        </label>
      </div>
      {fieldState.error && (
        <p className={classNames(`font-normal mt-4 h-8 text-12`, { "text-red-500": fieldState.error, "text-gray-400": !fieldState.error })}>{fieldState?.error?.message}</p>
      )}
    </div>
  );
};
export default InputProfileImg;
