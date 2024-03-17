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
  hasBack?: boolean;
  onBackClick?: () => void;
}

const BottomButton = ({ onClick, children, isDisabled, isSkip = false, isSubmit = false, hasBack = false, onBackClick }: Props) => {
  const path = usePathname();

  return (
    <div
      className={classNames("fixed bottom-0 left-0 z-nav flex w-full items-center gap-12 border-t border-gray-50 bg-white-black px-20 pb-24 pt-12 tablet:px-80 pc:sticky pc:px-0", {
        "flex-col": isSkip,
      })}
    >
      {hasBack && (
        <div className="w-1/2">
          <Button type="linedGray" size="xl" onClick={onBackClick}>
            뒤로
          </Button>
        </div>
      )}
      <div className={classNames("w-full", { "!w-1/2": hasBack })}>
        <Button size="xl" onClick={onClick} isDisabled={isDisabled} isSubmit={isSubmit}>
          {children}
        </Button>
      </div>
      {isSkip && <button className="text-14 font-500 text-gray-500">다음에 설정하기</button>}
    </div>
  );
};

export default BottomButton;
