"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import ConfettiIcon from "@/public/icon/favicon.svg";
import SearchIcon from "@/public/icon/search.svg";

const SearchBar = () => {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.value;
    setKeyword(nextValue);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?sort=최신순&keyword=${keyword}`);
  };

  return (
    <form onSubmit={handleSubmit} className="relative px-20 pc:px-40">
      <div className="absolute left-36 top-1/2 -translate-y-1/2 pc:left-60">
        <ConfettiIcon width={28} height={28} viewBox="0 0 260 260" />
      </div>
      <button className="absolute right-48 top-1/2 hidden h-40 w-40 -translate-y-1/2 items-center justify-center rounded-full bg-main-pink-500 pc:flex">
        <SearchIcon width={24} height={24} viewBox="0 0 24 24" stroke="#ffffff" />
      </button>
      <div className="flex-center absolute right-24 top-1/2 h-36 w-36 -translate-y-1/2 rounded-full bg-main-pink-500 pc:hidden">
        <SearchIcon width={20} height={20} viewBox="0 0 24 24" stroke="#ffffff" />
      </div>
      <input
        onChange={handleChange}
        placeholder="최애의 행사를 찾아보세요!"
        className="h-44 w-full rounded-full border border-main-pink-300 px-52 text-16 font-400 outline-none placeholder:text-gray-400 pc:h-56 pc:px-56 pc:text-20 pc:font-500"
      />
    </form>
  );
};

export default SearchBar;
