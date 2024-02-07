import { ReactNode } from "react";

interface Props {
  title?: string;
  children: ReactNode;
}

const Carousel = ({ title, children }: Props) => {
  return (
    <div className="flex flex-col gap-16">
      {title && <h2 className="px-20 text-20 font-700 text-gray-900">{title}</h2>}
      <div className="flex gap-16 overflow-auto px-20">{children}</div>
    </div>
  );
};

export default Carousel;
