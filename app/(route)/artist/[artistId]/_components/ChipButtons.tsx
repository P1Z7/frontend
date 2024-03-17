import ChipButton from "@/components/chip/ChipButton";

interface Props {
  status: number;
  setStatus: (status: number) => void;
}

const ChipButtons = ({ status, setStatus }: Props) => {
  return (
    <div className="flex w-full gap-12 px-20">
      <ChipButton label="예정" onClick={() => setStatus(status === 1 || status === 3 ? status - 1 : (status % 4) + 1)} selected={status === 1 || status === 3} />
      <ChipButton label="진행중" onClick={() => setStatus(status === 2 || status === 3 ? status - 2 : (status % 4) + 2)} selected={status === 2 || status === 3} />
      <ChipButton label="종료" onClick={() => setStatus(status === 4 ? 0 : 4)} selected={status === 4} />
    </div>
  );
};

export default ChipButtons;
