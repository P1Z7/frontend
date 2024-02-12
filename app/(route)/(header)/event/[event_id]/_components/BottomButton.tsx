"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "@/components/button";

const BottomButton = () => {
  const pathname = usePathname();
  const postUrl = pathname + "/post";
  return (
    <div className="sticky bottom-0 w-full border-t border-gray-50 bg-white-black px-20 pb-24 pt-12">
      <Link href={postUrl}>
        <Button size="xl" type="lined">
          후기 작성하기
        </Button>
      </Link>
    </div>
  );
};

export default BottomButton;
