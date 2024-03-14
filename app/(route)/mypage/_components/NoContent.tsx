import { useRouter } from "next/navigation";

const TAB = {
  MyCalendar: {
    title: "관심있는 행사에 좋아요를 눌러보세요!",
    path: "/search",
    sub: "행사 둘러보기",
  },
  MyReview: {
    title: "아직 작성하신 후기가 없습니다😶",
  },
  MyPost: {
    title: "작성하신 행사가 없습니다.",
    path: "/post",
    sub: "새 행사 등록하러 가기",
  },
};

interface Props {
  type: keyof typeof TAB;
}

const NoContent = ({ type }: Props) => {
  const route = useRouter();
  const tabType = TAB[type];

  return (
    <div className="flex-center flex-col gap-8 p-40">
      <h1 className="text-16 font-500 ">{tabType.title}</h1>
      {"path" in tabType && (
        <button onClick={() => route.push(tabType.path)} className="text-14 text-sub-pink hover:underline">
          {tabType.sub}
        </button>
      )}
    </div>
  );
};

export default NoContent;
