import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/useModal";
import { outSession } from "@/store/session/cookies";

const WithdrawModal = dynamic(() => import("@/components/modal/WithdrawModal"), { ssr: false });

const EditUserInfo = {
  profile: "프로필 수정",
  password: "비밀번호 변경",
  logOut: "로그아웃",
  withdrawal: "회원탈퇴",
};

const ButtonStyle = "w-full cursor-pointer border-b border-gray-50 px-24 py-20 pc:px-20 pc:py-16 hover:pc:bg-main-pink-50";

const SettingList = ({ isOpener }: { isOpener: boolean }) => {
  const router = useRouter();
  const { modal, openModal, closeModal } = useModal();

  return (
    <>
      <ul className="flex h-fit w-full flex-col items-start text-16 text-gray-900 pc:text-14 pc:font-500" onClick={(event) => event.stopPropagation()}>
        <li className={`mt-20 rounded-t-lg pc:mt-0 ${ButtonStyle}`} onClick={() => router.push("/setting/profile")}>
          {EditUserInfo.profile}
        </li>
        {isOpener && (
          <li className={ButtonStyle} onClick={() => router.push("/setting/password")}>
            {EditUserInfo.password}
          </li>
        )}
        <li onClick={() => (outSession(), router.push("/"), router.refresh())} className={ButtonStyle}>
          {EditUserInfo.logOut}
        </li>
        <li onClick={() => openModal("withdraw")} className={`rounded-b-lg ${ButtonStyle}`}>
          {EditUserInfo.withdrawal}
        </li>
        <li className={`pc:hidden ${ButtonStyle}`} />
      </ul>
      {modal === "withdraw" && <WithdrawModal closeModal={closeModal} />}
    </>
  );
};

export default SettingList;
