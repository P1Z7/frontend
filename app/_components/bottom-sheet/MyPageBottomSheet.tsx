import BottomSheetFrame from "./BottomSheetFrame";

interface Props {
  closeBottomSheet: () => void;
}

const EditUserInfo = {
  profile: "프로필수정",
  password: "비밀번호변경",
  logOut: "로그아웃",
  withdrawal: "회원탈퇴",
};

const MyPageBottomSheet = ({ closeBottomSheet }: Props) => {
  return (
    <BottomSheetFrame closeBottomSheet={closeBottomSheet}>
      <div className="flex flex-col gap-20 p-20 text-16" onClick={(event) => event.stopPropagation()}>
        <p>{EditUserInfo.profile}</p>
        <p>{EditUserInfo.password}</p>
        <p>{EditUserInfo.logOut}</p>
        <p>{EditUserInfo.withdrawal}</p>
      </div>
    </BottomSheetFrame>
  );
};

export default MyPageBottomSheet;
