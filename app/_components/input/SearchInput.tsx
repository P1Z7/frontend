import { Dispatch, SetStateAction, useEffect } from "react";
import { KeyboardEvent } from "react";
import { useForm } from "react-hook-form";
import CloseIcon from "@/public/icon/close.svg";
import SearchIcon from "@/public/icon/search.svg";

interface Props {
  setKeyword: Dispatch<SetStateAction<string>>;
  placeholder?: string;
}

const SearchInput = ({ setKeyword, placeholder = "검색어를 입력하세요." }: Props) => {
  const { register, getValues, setValue, watch } = useForm();
  const { search } = watch();

  const handleSearchEnter = (event: KeyboardEvent) => {
    if (event.keyCode === 13) {
      setKeyword(getValues("search"));
    }
  };

  const handleCloseClick = () => {
    setKeyword("");
    setValue("search", "");
  };

  useEffect(() => {
    if (!search) {
      handleCloseClick();
    }
  }, [search]);

  return (
    <div className="relative">
      <input
        className="placeholder:gray-400 h-44 w-full rounded-full bg-gray-50 px-16 py-12 pr-68 text-black-white focus:outline-none"
        placeholder={placeholder}
        {...register("search")}
        onKeyDown={handleSearchEnter}
      />
      <button className="absolute right-12 top-12" onClick={() => setKeyword(getValues("search"))}>
        <SearchIcon width="20" height="20" stroke="#494F5A" />
      </button>
      {search && (
        <button className="absolute right-48 top-[1.4rem]" onClick={handleCloseClick}>
          <CloseIcon stroke="#A0A5B1" width="16" height="16" />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
