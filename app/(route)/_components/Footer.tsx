import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="mb-72 w-full bg-white-black pc:mb-0 pc:py-32">
      <p className="p-20 text-12 font-500 leading-8 text-gray-500 pc:mx-auto pc:w-[104rem] pc:p-0">
        <Link href="https://myopener.notion.site/Opener-eb86265c64e841e09ad8f5a56b0961da?pvs=4">About Opener</Link>
        <br />
        contact : myopener@naver.com | myopener@gmail.com
        <br />
        instagram : <Link href="https://www.instagram.com/my_opener/">@my_opener</Link>
        <br />
        twitter : <Link href="https://twitter.com/myopener">@myopener</Link>
        <br />
        Copyright © p1z7 All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
