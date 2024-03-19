import { ReactNode } from "react";

const MAX_W = {
  extraNarrow: "pc:max-w-[68.8rem]",
  narrow: "pc:max-w-[83.4rem]",
  wide: "pc:max-w-[104rem]",
  extrawide: "pc:max-w-[112rem]",
};

interface Props {
  children: ReactNode;
  size: "narrow" | "wide" | "extrawide" | "extraNarrow";
}

const DottedLayout = ({ children, size }: Props) => {
  return (
    <>
      <div className="w-full pc:min-h-dvh pc:bg-[url('/image/dotted-background.png')] pc:bg-[length:100%_auto] pc:bg-top pc:bg-repeat-y pc:px-20">
        <div className={`pc:mx-auto ${MAX_W[size]} pc:bg-white-black`}>{children}</div>
      </div>
    </>
  );
};

export default DottedLayout;
