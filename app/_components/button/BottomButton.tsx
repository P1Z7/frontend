import { ReactNode } from "react";
import Button from "@/components/button";

interface Props {
  onClick?: () => void;
  children: ReactNode;
  isDisabled?: boolean;
  isSkip?: boolean;
}

const BottomButton = ({ onClick, children, isDisabled, isSkip = false }: Props) => {
  return (
    <div className="fixed bottom-0 left-0 z-nav flex w-360 flex-col items-center gap-12 border-t border-gray-50 bg-white-black px-20 pb-24 pt-12">
      <Button size="xl" onClick={onClick} isDisabled={isDisabled}>
        {children}
      </Button>
      {isSkip && <button className="text-14 font-500 text-gray-500">다음에 설정하기</button>}
    </div>
  );
};

export default BottomButton;
