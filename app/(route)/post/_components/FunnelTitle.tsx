const POST_FUNNEL_TITLE = {
  "행사 대상": "🎉 누구를 위한 행사인가요?",
  "행사 정보": "🎈 행사 정보를 입력해주세요!",
  "특전 정보": "🎁 추가 정보를 입력해주세요!",
  "상세 설명": "✨ 이미지와 설명을 작성해주세요.",
};

interface Props {
  step: "행사 대상" | "행사 정보" | "특전 정보" | "상세 설명";
  isRequired?: boolean;
}

const FunnelTitle = ({ step, isRequired = false }: Props) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-20 font-700">{POST_FUNNEL_TITLE[step]}</div>
      {isRequired ? <div className="text-blue text-14 font-500">*필수 입력 사항입니다.</div> : <div className="text-14 font-500 text-gray-400">*선택 입력 사항입니다.</div>}
    </div>
  );
};

export default FunnelTitle;
