const POST_FUNNEL_TITLE = {
  "행사 대상": "누구를 위한 행사인가요🎉?",
  "행사 정보": "행사 정보를 입력해주세요🎈",
  "특전 정보": "주최자와 특전 정보를 추가해주세요🎁",
  "상세 설명": "이미지와 설명을 작성해주세요✨",
};

interface Props {
  step: "행사 대상" | "행사 정보" | "특전 정보" | "상세 설명";
}

const FunnelTitle = ({ step }: Props) => {
  const isRequired = step.includes("행사");
  return (
    <div className="flex-col gap-8">
      <div className="text-20 font-900">{POST_FUNNEL_TITLE[step]}</div>
      {isRequired ? <div className="text-12 font-500 text-[#2461FF]">*필수 입력 사항입니다.</div> : <div className="text-12 font-500 text-[#787878]">*선택 입력 사항입니다.</div>}
    </div>
  );
};

export default FunnelTitle;
