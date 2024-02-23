import { useEffect } from "react";
import { useStore } from "@/store/index";
import CheckBox from "./CheckBox";

const WarningCheck = () => {
  const { isCheck, setIsCheck } = useStore((state) => ({ isCheck: state.isWarningCheck, setIsCheck: state.setIsWarningCheck }));

  useEffect(() => {
    setIsCheck(false);
  }, []);

  return (
    <div className="flex flex-col gap-8 pt-20">
      <div className="rounded-sm bg-gray-50 px-12 py-8 text-12 font-500 text-gray-700">
        허위 사실 또는 악의적인 비방을 포함하는 게시글은 통보없이 삭제될 수 있습니다. 게시물로 인해 발생하는 결과에 대한 모든 책임은 작성자 본인에게 있습니다.
      </div>
      <CheckBox isCheck={isCheck} setIsCheck={setIsCheck}>
        안내사항을 확인하였으며, 동의합니다.
      </CheckBox>
    </div>
  );
};

export default WarningCheck;
