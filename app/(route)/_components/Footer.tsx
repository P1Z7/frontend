import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-white-black pc:mb-0 pc:py-32">
      <p className="p-20 text-12 leading-9 text-gray-400 pc:mx-auto pc:w-[104rem] pc:p-0">
        <Link href="https://myopener.notion.site/Opener-eb86265c64e841e09ad8f5a56b0961da?pvs=4" target="_blank" rel="noreferrer noopener">
          오프너 소개 &nbsp; | &nbsp;{" "}
        </Link>
        <Link href="https://myopener.notion.site/myopener/6f8fdb2c86634b1499d5d3fe68df0465" target="_blank" rel="noreferrer noopener">
          개인정보처리방침 &nbsp; | &nbsp;{" "}
        </Link>
        <Link href="https://myopener.notion.site/myopener/1bcf61eafa3c4a9095dda305b253310f" target="_blank" rel="noreferrer noopener">
          이용약관
        </Link>
        <br />
        contact : myopener@naver.com &nbsp;| &nbsp;myopener@gmail.com
        <br />
        instagram :{" "}
        <Link href="https://www.instagram.com/my_opener/" target="_blank" rel="noreferrer noopener">
          @my_opener &nbsp;| &nbsp;
        </Link>
        twitter :{" "}
        <Link href="https://twitter.com/myopener" target="_blank" rel="noreferrer noopener">
          @myopener
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
