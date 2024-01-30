import { useStore } from "../_store";

const WarningCheck = () => {
  const { isCheck, setIsCheck } = useStore((state) => ({ isCheck: state.isWarningCheck, setIsCheck: state.setIsWarningCheck }));
  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-sm bg-[#DDD] px-12 py-8">
        허위 등록, 악의적인 등록은 삭제될 수 있으며, 이로 인한 피해가 발생할 경우 전적으로 게시자가 책임집니다.(대략이런내용) 이용약관 상수로 관리할까여말까여 흠 고민고민..
      </div>
      {isCheck ? <div onClick={() => setIsCheck(false)}>체크됨</div> : <div onClick={() => setIsCheck(true)}>클릭하면 체크</div>}
    </div>
  );
};

export default WarningCheck;
