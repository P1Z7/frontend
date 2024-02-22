import { PostType } from "@/(route)/post/page";
import { useFormContext } from "react-hook-form";

const EVENT_TYPE_LIST = ["카페", "꽃집", "팬광고", "포토부스", "상영회", "기타"];

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
    <ul className="pb-40 pt-16 pc:pb-0" ref={contentRef}>
      {EVENT_TYPE_LIST.map((event) => (
        <li key={event} onClick={() => handleEventClick(event)} className="cursor-pointer border-b border-gray-50 px-24 py-20 text-16 font-500 text-gray-900 hover:bg-main-pink-50">
          {event}
        </li>
      ))}
    </ul>
  );
};

export default EventTypeList;
