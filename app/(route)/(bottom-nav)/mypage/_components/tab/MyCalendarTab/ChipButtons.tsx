import ChipButton from "@/components/chip/ChipButton";

type StatueType = "" | "예정" | "종료" | "진행중" | "종료제외";

const ChipButtons = ({ statue, setStatus }: { statue: string; setStatus: (statue: StatueType) => void }) => {
  const handleChipClick = (label: StatueType) => {
    switch (label) {
      case statue:
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
      <ChipButton label="예정" onClick={() => handleChipClick("예정")} selected={statue === "예정"} />
      <ChipButton label="진행중" onClick={() => handleChipClick("진행중")} selected={statue === "진행중"} />
      <ChipButton label="종료" onClick={() => handleChipClick("종료")} selected={statue === "종료"} />
    </div>
  );
};

export default ChipButtons;
