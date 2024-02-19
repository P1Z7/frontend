"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import RightArrowIcon from "@/public/icon/arrow-right_lg.svg";
import ExclamationIcon from "@/public/icon/exclamation.svg";

interface Props {
  message: string;
  href?: string;
}

const Alert = ({ message, href }: Props) => {
  const path = usePathname();
  return (
    <Link href={href || path} className="flex items-center justify-between rounded-sm bg-[#F63D3D0D] p-8">
      <div className="flex-center gap-4">
        <ExclamationIcon />
        <p className="text-12 font-500 text-red pc:text-14">{message}</p>
      </div>
      <RightArrowIcon stroke="#F63D3D" />
    </Link>
  );
};
export default Alert;
