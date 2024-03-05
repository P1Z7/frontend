"use client";

import Link from "next/link";
import { useState } from "react";
import Hamburger from "@/public/icon/hamburger.svg";
import Logo from "@/public/icon/logo.svg";
import SearchIcon from "@/public/icon/search.svg";

const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-nav flex h-72 w-full items-center justify-between bg-white-black px-20 pb-12 pt-32 pc:hidden">
      <Link href="/">
        <Logo />
      </Link>
      <div className="flex gap-12">
        <Link href="/search?sort=최신순">
          <SearchIcon width="24" height="24" stroke="#1C1E22" />
        </Link>
        <button onClick={() => setIsOpen((prev) => !prev)}>
          <Hamburger />
        </button>
      </div>
    </header>
  );
};

export default MobileHeader;
