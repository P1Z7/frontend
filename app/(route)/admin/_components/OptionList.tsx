import { useStore } from "@/store/index";
import { AdminOptionType } from "@/store/slice/adminSlice";

const ADMIN_LIST = ["아티스트 요청 목록", "리뷰 신고 목록", "이벤트 신고 목록", "행사 삭제 - 종료", "행사 삭제 - 예정&진행중"] as AdminOptionType[];

const OptionList = () => {
  const { setOption } = useStore((state) => ({ setOption: state.setAdminOption }));

  return (
    <div className="flex w-full max-w-[51rem] flex-col gap-12">
      <span className="overflow-hidden whitespace-nowrap text-center text-20 font-600 text-red">WARNING! WARNING! WARNING! WARNING! WARNING!</span>
      {ADMIN_LIST.map((item) => (
        <button key={item} type="button" onClick={() => setOption(item)} className="rounded-sm bg-black-white p-16 text-center text-white-black hover:bg-red">
          {item}
        </button>
      ))}
      <span className="overflow-hidden whitespace-nowrap text-center text-20 font-600 text-red">WARNING! WARNING! WARNING! WARNING! WARNING!</span>
    </div>
  );
};

export default OptionList;
