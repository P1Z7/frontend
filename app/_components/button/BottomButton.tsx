import classNames from "classnames";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Button from "@/components/button";

interface Props {
  onClick?: () => void;
  children: ReactNode;
  isDisabled?: boolean;
  isSkip?: boolean;
  isSubmit?: boolean;
}

const BottomButton = ({ onClick, children, isDisabled, isSkip = false, isSubmit = false }: Props) => {
  const path = usePathname();

  return (
    <div className="fixed bottom-0 left-0 z-nav flex w-full flex-col items-center gap-12 border-t border-gray-50 bg-white-black px-20 pb-24 pt-12 pc:sticky pc:mt-20">
      <Button size="xl" onClick={onClick} isDisabled={isDisabled} isSubmit={isSubmit}>
        {children}
      </Button>
      {isSkip && <button className="text-14 font-500 text-gray-500">다음에 설정하기</button>}
    </div>
  );
};

export default BottomButton;
