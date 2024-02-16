import { ReactNode } from "react";

const WIDTH = {
  narrow: "w-384",
  wide: "w-[54.8rem]",
};

interface Props {
  children: ReactNode;
  size: "narrow" | "wide";
}

const PinkLayout = ({ children, size }: Props) => {
  return (
    <>
      <div className="pc:hidden">{children}</div>
      <div className="hidden min-h-[calc(100dvh-7.2rem)] w-full items-center justify-center bg-main-pink-50 bg-[url('/image/dotted-background.png')] bg-[length:100%_auto] bg-top bg-repeat-y px-20 pc:flex">
        <div className={`relative h-[66rem] rotate-0 overflow-y-scroll rounded-lg bg-white-black shadow-[0px_4px_20px_0px_rgba(0,0,0,0.12)] ${WIDTH[size]}`}>{children}</div>
      </div>
    </>
  );
};

export default PinkLayout;
