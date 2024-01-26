interface Props {
  onNextStep?: () => void;
  isDisabled?: boolean;
}

const PostFooter = ({ onNextStep, isDisabled = false }: Props) => {
  return (
    <div className="fixed bottom-0 left-0 w-full p-20">
      <div className="border-b-2 border-black" />
      <button onClick={onNextStep} disabled={isDisabled} className="mt-12 w-full rounded-sm bg-gray-200 p-16 text-16 font-600">
        {typeof onNextStep === "undefined" ? "등록하기" : "다음으로"}
      </button>
    </div>
  );
};

export default PostFooter;
