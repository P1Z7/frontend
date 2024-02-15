import { useRouter } from "next/navigation";
import { outSession } from "@/store/session/cookies";
import { BottomSheetBaseType } from "@/types/index";
import BottomSheet from "./BottomSheetMaterial";

const EditUserInfo = {
  profile: "프로필수정",
  password: "비밀번호변경",
  logOut: "로그아웃",
  withdrawal: "회원탈퇴",
};

const ButtonStyle = "w-full cursor-pointer border-b border-gray-50 px-24 py-20";

const MyPageBottomSheet = ({ closeBottomSheet, refs }: any) => {
  const router = useRouter();

  return (
    <BottomSheet.Frame closeBottomSheet={closeBottomSheet} ref={refs.sheet}>
      <ul className="flex h-fit w-full flex-col items-start text-16" onClick={(event) => event.stopPropagation()}>
        <li className={`mt-20 ${ButtonStyle}`} onClick={() => router.push("/setting/profile")}>
          {EditUserInfo.profile}
        </li>
        <li className={ButtonStyle} onClick={() => router.push("/setting/password")}>
          {EditUserInfo.password}
        </li>
        <li onClick={() => (outSession(), router.refresh())} className={ButtonStyle}>
          {EditUserInfo.logOut}
        </li>
        <li className={ButtonStyle}>{EditUserInfo.withdrawal}</li>
        <li className={ButtonStyle} />
      </ul>
    </BottomSheet.Frame>
  );
};

export default MyPageBottomSheet;
