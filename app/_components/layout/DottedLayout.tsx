import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  type: "narrow" | "wide";
}

const MAX_X = {
  narrow: "max-w-[83.4rem]",
  wide: "max-w-[104rem]",
};

const DottedLayout = ({ children, type }: Props) => {
  return (
    <div className="w-full bg-[url('/image/dotted-background.png')] bg-contain bg-repeat-y">
      <div className={`mx-auto ${MAX_X[type]}`}>{children}</div>
      <div />
    </div>
  );
};

export default DottedLayout;
