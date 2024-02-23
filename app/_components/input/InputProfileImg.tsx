import classNames from "classnames";
import Image from "next/image";
import { ChangeEvent, KeyboardEvent, ReactNode, useState } from "react";
import { FieldPath, FieldValues, UseControllerProps, useController } from "react-hook-form";
import { getSession } from "@/store/session/cookies";
import { openToast } from "@/utils/toast";
import { TOAST_MESSAGE } from "@/constants/toast";
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

  const session = getSession();
  const [thumbnail, setThumbnail] = useState(session?.user.profileImage ?? "");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    if (!image) {
      return;
    }

    const maxSize = 1024 * 1024 * 1;
    if (image && image.size > maxSize) {
      openToast.error(TOAST_MESSAGE.profileLimit);
      return;
    }

    field.onChange({ target: { value: image, name: field.name } });

    const newThumbnail = URL.createObjectURL(image);
    setThumbnail(newThumbnail);
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
        <Image
          src={thumbnail || "/icon/no-profile.svg"}
          width={100}
          height={100}
          alt="설정할 프로필 이미지"
          className="pointer-events-none -mt-[0.2rem] h-100  rounded-full object-cover"
        />
        {thumbnail ? (
          <>
            <label
              htmlFor="file"
              onKeyDown={handleKeyDown}
              tabIndex={0}
              className="flex-center absolute right-0 top-0 h-28 w-28 cursor-pointer rounded-md border border-white-black bg-main-pink-500"
            >
              <EditIcon />
            </label>
            <button
              type="button"
              onClick={() => {
                field.onChange({ target: { value: null, name: field.name } });
                setThumbnail("");
              }}
              className="w-max self-center text-14 font-600 text-gray-400 underline"
            >
              기본 이미지로 변경
            </button>
          </>
        ) : (
          <label
            htmlFor="file"
            onKeyDown={handleKeyDown}
            tabIndex={0}
            className="flex-center h-32 w-100 cursor-pointer rounded-sm border border-gray-400 bg-gray-50 px-16 text-14 font-600 text-gray-700"
          >
            이미지 등록
          </label>
        )}
        <input id="file" type="file" name={field.name} ref={field.ref} multiple onChange={handleChange} className="hidden" accept=".jpg,.jpeg,.png,.webp" />
      </div>
      {fieldState.error && (
        <p className={classNames(`font-normal mt-4 h-8 text-12`, { "text-red-500": fieldState.error, "text-gray-400": !fieldState.error })}>{fieldState?.error?.message}</p>
      )}
    </div>
  );
};
export default InputProfileImg;
