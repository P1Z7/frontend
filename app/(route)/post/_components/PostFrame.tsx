import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const PostFrame = ({ children }: Props) => {
  return <div className="flex flex-col gap-24 px-20">{children}</div>;
};

export default PostFrame;
