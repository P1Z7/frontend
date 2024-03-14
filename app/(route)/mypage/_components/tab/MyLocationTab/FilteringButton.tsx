import CheckIcon from "@/public/icon/check.svg";

const ButtonColor = {
  checked: "bg-sub-pink text-white-white",
  notChecked: "bg-white-white border border-gray-100 text-gray-900",
};

interface Props {
  setIsChecked: (inChecked: boolean) => void;
  isChecked: boolean;
}

const FilteringButton = ({ setIsChecked, isChecked }: Props) => {
  return (
    <button
      onClick={() => setIsChecked(!isChecked)}
      className={`flex-center fixed bottom-100 left-1/2 z-nav w-fit -translate-x-1/2 rounded-full px-12 py-4 text-14 font-500 shadow-hero ${isChecked ? ButtonColor.checked : ButtonColor.notChecked} py-4 pc:absolute pc:bottom-80 pc:text-16`}
    >
      종료된 행사 제외
      <CheckIcon width={20} height={20} viewBox="0 0 24 24" stroke={isChecked ? "white" : "#1C1E22"} />
    </button>
  );
};

export default FilteringButton;
