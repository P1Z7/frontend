import { PostType } from "@/(route)/post/page";
import { useFormContext } from "react-hook-form";

const EVENT_TYPE_LIST = ["카페", "나눔", "팬광고", "팝업스토어", "상영회", "기타"];

const STYLE = {
  bottomSheet: "pb-40 pt-16",
  dropDown: "shadow-postBox overflow-hidden rounded-md",
};

interface Props {
  handleClickFunc: () => void;
  contentRef?: (node: HTMLElement | null) => void;
  type: "bottomSheet" | "dropDown";
}

const EventTypeList = ({ handleClickFunc, contentRef, type }: Props) => {
  const { setValue } = useFormContext<PostType>();

  const handleEventClick = (type: string) => {
    setValue("eventType", type);
    handleClickFunc();
  };

  return (
    <ul className={STYLE[type]} ref={contentRef}>
      {EVENT_TYPE_LIST.map((event) => (
        <li key={event} onClick={() => handleEventClick(event)} className="cursor-pointer border-b border-gray-50 px-24 py-20 text-16 font-500 text-gray-900 hover:bg-main-pink-50">
          {event}
        </li>
      ))}
    </ul>
  );
};

export default EventTypeList;
