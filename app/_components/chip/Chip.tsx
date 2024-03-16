import { EventType, GiftType } from "@/types/index";
import { EVENT_EMOJI, TAG_EMOJI } from "@/constants/post";

type Label<T> = T extends "event" ? EventType : GiftType;
type Kind = "event" | "goods";
interface Props<T> {
  label: Label<T>;
  kind: T;
}

const Chip = <T extends Kind>({ label, kind }: Props<T>) => {
  const colorStyle = () => {
    if (kind === "event") {
      return "bg-gray-900 text-white-white";
    }
    if (kind === "goods") {
      return "bg-gray-50 text-gray-700";
    }
  };

  const getEmoji = () => {
    if (kind === "event") {
      return EVENT_EMOJI[label as EventType];
    }
    if (kind === "goods") {
      return TAG_EMOJI[label as GiftType];
    }
  };

  return (
    <div className={`flex-center h-[2.2rem] w-max flex-shrink-0 rounded-lg px-8 pc:h-24 ${colorStyle()}`}>
      <span className="text-12 font-600 pc:text-14">
        {getEmoji()}
        {label}
      </span>
    </div>
  );
};
export default Chip;
