import { ReactNode } from "react";

const WIDTH = {
  narrow: "w-384",
  wide: "w-[54.8rem]",
  middle: "w-[42.4rem]",
};

interface Props {
  children: ReactNode;
  size: "narrow" | "wide" | "middle";
}

const PinkLayout = ({ children, size }: Props) => {
  return (
    <>
      <div className="pc:hidden">{children}</div>
      <div
        id="layout_base"
        className="hidden h-[calc(100dvh-7.2rem)] w-full items-center justify-center overflow-hidden bg-main-pink-50 bg-[url('/image/dotted-background.png')] bg-[length:100%_auto] bg-top bg-repeat-y px-20 py-48 pc:flex"
      >
        <div
          className={`pc:relative pc:max-h-[70vh] pc:rotate-0 pc:overflow-y-scroll pc:rounded-lg pc:bg-white-black pc:shadow-[0px_4px_20px_0px_rgba(0,0,0,0.12)] ${WIDTH[size]}`}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default PinkLayout;
