import PartyIcon from "@/public/icon/party.svg";
import SadIcon from "@/public/icon/sad.svg";

interface Props {
  rating: boolean;
}

const Evaluation = ({ rating }: Props) => {
  return (
    <div
      className={`flex h-40 w-full max-w-320 items-center gap-8 rounded-sm border px-12 py-8 text-14 font-500 ${rating ? "border-blue bg-sub-blue-bg text-blue" : "border-gray-200 bg-gray-50 text-gray-600"}`}
    >
      {rating ? (
        <>
          <PartyIcon />
          최고의 행사, 추천합니다!
        </>
      ) : (
        <>
          <SadIcon />
          조금 아쉬웠어요...
        </>
      )}
    </div>
  );
};

export default Evaluation;
