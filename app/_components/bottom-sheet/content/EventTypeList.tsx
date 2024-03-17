import { PostType } from "@/(route)/post/page";
import { useFormContext } from "react-hook-form";
import { EventType } from "@/types/index";

const EVENT_TYPE_LIST = ["카페", "꽃집", "팬광고", "포토부스", "상영회", "기타"];

const EVENT_TYPE_EMOJI = {
  카페: "☕",
  꽃집: "🌷",
  팬광고: "📢",
  상영회: "🎬",
  포토부스: "📸",
  기타: "🎉",
};

interface Props {
  handleClickFunc: () => void;
  contentRef?: (node: HTMLElement | null) => void;
}

const EventTypeList = ({ handleClickFunc, contentRef }: Props) => {
  const { setValue } = useFormContext<PostType>();

  const handleEventClick = (type: string) => {
    setValue("eventType", type);
    handleClickFunc();
  };

  return (
    <ul className="pb-40 pt-16 pc:overflow-hidden pc:rounded-md pc:pb-0 pc:pt-0 pc:shadow-postBox" ref={contentRef}>
      {EVENT_TYPE_LIST.map((eventType) => (
        <li
          tabIndex={0}
          key={eventType}
          onClick={() => handleEventClick(eventType)}
          onKeyDown={(event) => {
            if (event.key === "Enter") handleEventClick(eventType);
          }}
          className="cursor-pointer border-b border-gray-50 px-24 py-20 text-16 font-500 text-gray-900 hover:bg-main-pink-50 pc:px-20 pc:py-16"
        >
          {`${EVENT_TYPE_EMOJI[eventType as EventType]} ${eventType}`}
        </li>
      ))}
    </ul>
  );
};

export default EventTypeList;
