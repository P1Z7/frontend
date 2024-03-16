import Image from "next/image";
import Link from "next/link";
import Button from "@/components/button";

const NotFound = () => {
  return (
    <div className="flex-center min-h-[100vh] min-w-[100vw] flex-col gap-20">
      <Link href="/">
        <Image src="/image/notfound.png" alt="에러페이지 이미지" width={280} height={280} />
      </Link>
      <p className="text-20 font-500 text-main-pink-500">페이지를 찾을 수 없습니다.</p>
      <div className="w-128">
        <Button type="lined">돌아가기</Button>
      </div>
    </div>
  );
};

export default NotFound;
