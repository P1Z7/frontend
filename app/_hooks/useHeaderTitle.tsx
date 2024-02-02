import { useParams, usePathname } from "next/navigation";

const useHeaderTitle = () => {
  const pathname = usePathname();
  const { id } = useParams();
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
      title = "좋아요한 아티스트의 새 행사";
      break;
    case "/signup":
      title = "회원가입";
      break;
    case "/post":
      title = "등록하기";
      break;
    case `/event/${id}`:
      title = "카페 이름";
      break;
    case `/event/${id}/post`:
      title = "후기 작성하기";
      break;
    case `/event/${id}/edit`:
      title = "수정 등록하기";
      break;
    case `/event/${id}/approve`:
      title = "수정 승인하기";
      break;
    default:
      title = "";
  }

  return title;
};

export default useHeaderTitle;
