import ArrowDownIcon from "@/public/icon/arrow-down_sm.svg";
import ArrowUpIcon from "@/public/icon/arrow-up_sm.svg";

interface Props {
  setIsFold: (prev: boolean) => void;
  isFold: boolean;
}

const FoldButton = ({ setIsFold, isFold }: Props) => {
  const handleFoldClick = () => {
    setIsFold(!isFold);
  };

  return (
    <button className="flex-center w-fit px-12" onClick={handleFoldClick}>
      <p>{isFold ? "펼치기" : "접기"}</p>
      {isFold ? <ArrowDownIcon width="20" height="20" viewBox="0 0 24 24" stroke="#A0A5B1" /> : <ArrowUpIcon width="20" height="20" viewBox="0 0 24 24" stroke="#A0A5B1" />}
    </button>
  );
};

export default FoldButton;
