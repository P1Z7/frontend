import { useParams, usePathname } from "next/navigation";
import { useStore } from "@/store/index";

const useHeaderTitle = () => {
  const pathname = usePathname();
  const { eventId, editId } = useParams();
  const { eventHeader } = useStore((state) => ({ eventHeader: state.eventHeader }));
  let title = "";

  switch (pathname) {
    case "/setting/password":
      title = "비밀번호 변경";
      break;
    case "/setting/profile":
      title = "프로필 수정";
      break;
    case "/setting/favorite":
      title = "팔로우 아티스트 수정";
      break;
    case "/my-artist-event":
      title = "내 아티스트의 행사";
      break;
    case "/signup":
      title = "회원가입";
      break;
    case "/post":
      title = "등록하기";
      break;
    case `/event/${eventId}`:
      title = eventHeader;
      break;
    case `/event/${eventId}/post`:
      title = "후기 작성하기";
      break;
    case `/event/${eventId}/edit`:
      title = "수정하기";
      break;
    case `/event/${eventId}/approve`:
      title = "수정요청";
      break;
    case `/event/${eventId}/approve/${editId}`:
      title = "수정 승인하기";
      break;
    default:
      title = "";
  }

  return title;
};

export default useHeaderTitle;
