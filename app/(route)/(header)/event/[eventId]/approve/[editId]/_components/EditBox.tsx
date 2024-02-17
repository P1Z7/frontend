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
      <div className={classNames("min-h-40 whitespace-pre-wrap rounded-sm border-[0.15rem] border-gray-100 px-12 py-8 text-16 text-gray-900", { "!border-blue/25": isEdited })}>
        {children}
      </div>
    </div>
  );
};

export default EditBox;
