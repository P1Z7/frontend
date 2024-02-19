import { ReactNode } from "react";

const WIDTH = {
  narrow: "pc:w-384",
  wide: "pc:w-[54.8rem]",
};

interface Props {
  children: ReactNode;
  size: "narrow" | "wide";
}

const PinkLayout = ({ children, size }: Props) => {
  return (
    <div className="inline bg-repeat-y pc:flex pc:min-h-[calc(100dvh-7.2rem)] pc:w-full pc:items-center pc:justify-center pc:bg-main-pink-50 pc:bg-[url('/image/dotted-background.png')] pc:bg-[length:100%_auto] pc:bg-top pc:px-20">
      <div className={`pc:relative pc:h-[66rem] pc:rotate-0 pc:overflow-y-scroll pc:rounded-lg pc:bg-white-black pc:shadow-[0px_4px_20px_0px_rgba(0,0,0,0.12)] ${WIDTH[size]}`}>
        {children}
      </div>
    </div>
  );
};

export default PinkLayout;
