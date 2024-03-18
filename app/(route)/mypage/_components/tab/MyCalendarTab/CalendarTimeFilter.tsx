import ChipButton from "@/components/chip/ChipButton";
import { StatusType } from "@/types/index";

interface Props {
  status: string;
  setStatus: (status: StatusType) => void;
}

const CalendarTimeFilter = ({ status, setStatus }: Props) => {
  const handleChipClick = (label: StatusType) => {
    switch (label) {
      case status:
        setStatus("");
        break;
      case "예정":
        setStatus(label);
        break;
      case "종료":
        setStatus(label);
        break;
      case "진행중":
        setStatus(label);
        break;
    }
  };

  return (
    <div className="flex w-full gap-12">
      <ChipButton label="예정" onClick={() => handleChipClick("예정")} selected={status === "예정"} />
      <ChipButton label="진행중" onClick={() => handleChipClick("진행중")} selected={status === "진행중"} />
      <ChipButton label="종료" onClick={() => handleChipClick("종료")} selected={status === "종료"} />
    </div>
  );
};

export default CalendarTimeFilter;
