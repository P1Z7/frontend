import { useRouter } from "next/navigation";

const NoContentsInCalendar = () => {
  const route = useRouter();

  return (
    <div className="flex-center flex-col gap-8 p-40">
      <h1 className="text-16 font-500 ">관심있는 행사에 좋아요를 눌러보세요!</h1>
      <button onClick={() => route.push("/search")} className="text-14 text-sub-pink hover:underline">
        행사 둘러보기
      </button>
    </div>
  );
};

export default NoContentsInCalendar;
