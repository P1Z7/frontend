import { ReactNode } from "react";

const WIDTH = {
  narrow: "pc:w-[32vw]",
  middle: "pc:w-[36vw]",
  wide: "pc:w-[40vw]",
};

interface Props {
  children: ReactNode;
  size: "narrow" | "wide" | "middle";
}

const PinkLayout = ({ children, size }: Props) => {
  return (
    <div className="w-full pc:flex pc:h-[calc(100dvh-7.2rem)] pc:items-center pc:justify-center pc:bg-main-pink-50 pc:bg-[url('/image/dotted-background.png')] pc:bg-[length:100%_auto] pc:bg-top pc:bg-repeat-y pc:px-20 pc:py-48">
      <div className={`pc:relative pc:h-[80vh] pc:rotate-0 pc:overflow-y-scroll pc:rounded-lg pc:bg-white-black pc:shadow-[0px_4px_20px_0px_rgba(0,0,0,0.12)] ${WIDTH[size]}`}>
        {children}
      </div>
    </div>
  );
};

export default PinkLayout;
