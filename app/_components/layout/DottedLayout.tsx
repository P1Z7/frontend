import { ReactNode } from "react";

const MAX_W = {
  narrow: "max-w-[83.4rem]",
  wide: "max-w-[104rem]",
};

interface Props {
  children: ReactNode;
  size: "narrow" | "wide";
}

const DottedLayout = ({ children, size }: Props) => {
  return (
    <>
      <div className="pc:hidden">{children}</div>
      <div className="hidden min-h-dvh w-full bg-[url('/image/dotted-background.png')] bg-[length:100%_auto] bg-top bg-repeat-y px-20 pc:block">
        <div className={`mx-auto ${MAX_W[size]} bg-white-black`}>{children}</div>
      </div>
    </>
  );
};

export default DottedLayout;
