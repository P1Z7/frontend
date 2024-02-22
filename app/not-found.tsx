import Link from "next/link";
import Logo from "@/public/icon/logo-underline.svg";

const NotFound = () => {
  return (
    <div className="flex min-h-[100vh] min-w-[100vw] flex-col items-center justify-center gap-20 bg-sub-pink-bg">
      <Link href="/">
        <Logo />
      </Link>
      <p className="text-20 font-600">페이지를 찾을 수 없습니다!</p>
      <p className="text-center text-12 text-gray-600">
        존재하지 않는 주소를 입력하셨거나
        <br /> 주소가 변경, 삭제되어 찾을 수 없습니다.
      </p>
      <div className="flex gap-4 text-12">
        <Link href="/">홈으로</Link>✧<Link href="/search">행사 둘러보기</Link>✧<Link href="/signin">로그인하기</Link>
      </div>
    </div>
  );
};

export default NotFound;
