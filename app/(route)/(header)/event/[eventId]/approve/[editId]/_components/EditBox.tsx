import classNames from "classnames";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  isEdited?: boolean;
}

const EditBox = ({ children, isEdited = false }: Props) => {
  return (
    <div className="text-14 text-gray-500">
      {isEdited ? "수정 내용" : "기존 내용"}
      <div className={classNames("rounded-sm bg-gray-50 px-12 py-8 text-16 text-gray-900", { "!bg-blue !bg-opacity-[0.08]": isEdited })}>{children}</div>
    </div>
  );
};

export default EditBox;
