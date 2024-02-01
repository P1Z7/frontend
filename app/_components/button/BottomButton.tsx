import { ReactNode } from "react";
import Button from "@/components/button";

interface Props {
  onClick?: () => void;
  children: ReactNode;
  isDisabled?: boolean;
}

const BottomButton = ({ onClick, children, isDisabled }: Props) => {
  return (
    <div className="bg-white-black fixed bottom-0 left-0 z-popup w-360 border-t border-gray-50 px-20 pb-24 pt-12">
      <Button size="xl" onClick={onClick} isDisabled={isDisabled}>
        {children}
      </Button>
    </div>
  );
};

export default BottomButton;
