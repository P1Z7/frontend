"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "@/components/button";

const BottomButton = () => {
  const pathname = usePathname();
  const postUrl = pathname + "/post";
  return (
    <div className="sticky bottom-0 flex w-full items-center justify-center gap-24 border-t border-gray-50 bg-white-black px-20 pb-24 pt-12 pc:justify-end pc:rounded-lg pc:border-x pc:px-40 pc:pb-20 pc:pt-12 pc:shadow-sm">
      <span className="hidden text-14 font-400 text-gray-500 pc:inline">이벤트에 방문하셨다면 후기를 남겨주세요!</span>
      <Link href={postUrl} className="block w-full pc:w-320">
        <Button size="lg" type="lined">
          후기 작성하기
        </Button>
      </Link>
    </div>
  );
};

export default BottomButton;
