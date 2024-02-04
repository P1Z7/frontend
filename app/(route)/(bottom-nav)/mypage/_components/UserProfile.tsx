import Image from "next/image";
import MyPageBottomSheet from "@/components/bottom-sheet/MyPageBottomSheet";
import { useBottomSheet } from "@/hooks/useBottomSheet";

interface Props {
  data: {
    nickName: string;
    email: string;
    profileImg: null | string;
  };
}

const UserProfile = ({ data }: Props) => {
  const { bottomSheet, openBottomSheet, closeBottomSheet } = useBottomSheet();

  return (
    <div className="flex items-center justify-between px-20 pt-48">
      <div className="flex items-center gap-12">
        <Image src={data.profileImg ? data.profileImg : "/icon/no-profile.svg"} alt="이미지 추가 버튼" width={56} height={56} className="rounded-full" priority />
        <div className="flex flex-col gap-4">
          <p className="text-16 font-600">{data.nickName}</p>
          <p className="font-12 font-500 text-gray-400">{data.email}</p>
        </div>
      </div>
      <button onClick={() => openBottomSheet("mypage")}>
        <Image src="/icon/kebab-black.svg" width={24} height={25} alt="계정 정보 수정" />
      </button>
      {bottomSheet === "mypage" && <MyPageBottomSheet closeBottomSheet={closeBottomSheet} />}
    </div>
  );
};

export default UserProfile;
