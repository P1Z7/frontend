import { ReactNode } from "react";

const MAX_X = {
  narrow: "max-w-[83.4rem]",
  wide: "max-w-[104rem]",
};

interface Props {
  children: ReactNode;
  type: "narrow" | "wide";
}

const DottedLayout = ({ children, type }: Props) => {
  return (
    <div className="w-full bg-contain bg-repeat-y px-20 tablet:bg-[url('/image/dotted-background.png')]">
      <div className={`mx-auto ${MAX_X[type]} bg-white-black`}>{children}</div>
      <div />
    </div>
  );
};

export default DottedLayout;
