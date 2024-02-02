import React from "react";
import Button from "@/components/button";

interface Props {
  onClickLeft: () => void;
  onClickRight: () => void;
}

const BottomDoubleButton = ({ onClickLeft, onClickRight }: Props) => {
  return (
    <div className="fixed bottom-0 left-0 z-popup flex w-360 gap-8 border-t border-gray-50 bg-white-black px-20 pb-24 pt-12">
      <div className="w-156">
        {/* 추후 회색으로 변경 예정 */}
        <Button size="xl" type="lined" onClick={onClickLeft}>
          거절하기
        </Button>
      </div>
      <div className="w-156">
        <Button size="xl" type="lined" onClick={onClickRight}>
          승인하기
        </Button>
      </div>
    </div>
  );
};

export default BottomDoubleButton;
