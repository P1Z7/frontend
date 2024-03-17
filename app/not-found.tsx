import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex-center min-h-[100vh] min-w-[100vw] flex-col gap-20">
      <Link href="/">
        <Image src="/image/notfound.png" alt="에러페이지 이미지" width={280} height={280} sizes="150px" />
      </Link>
      <p className="text-20 font-500 text-main-pink-500">페이지를 찾을 수 없습니다.</p>
      <Link
        href="/"
        className="flex-center h-48 w-128 shrink-0 gap-4 rounded-md border border-main-pink-300 bg-main-pink-50 px-16 text-16 font-600 text-main-pink-white disabled:border-gray-200 disabled:bg-gray-200 disabled:text-white-white"
      >
        돌아가기
      </Link>
    </div>
  );
};

export default NotFound;
