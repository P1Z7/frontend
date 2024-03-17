import ChipButton from "@/components/chip/ChipButton";
import { STATUS } from "@/constants/eventStatus";

interface Props {
  status: number;
  setStatus: (status: number) => void;
}

const ChipButtons = ({ status, setStatus }: Props) => {
  return (
    <div className="flex w-full gap-12 px-20">
      <ChipButton label={STATUS[1]} onClick={() => setStatus(status === 1 ? 1 : status === 3 ? status - 1 : (status % 4) + 1)} selected={status === 1 || status === 3} />
      <ChipButton label={STATUS[2]} onClick={() => setStatus(status === 2 ? 2 : status === 3 ? status - 2 : (status % 4) + 2)} selected={status === 2 || status === 3} />
      <ChipButton label={STATUS[4]} onClick={() => setStatus(status === 4 ? 3 : 4)} selected={status === 4} />
    </div>
  );
};

export default ChipButtons;
