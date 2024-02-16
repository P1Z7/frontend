import { Dispatch, SetStateAction, useEffect } from "react";
import { KeyboardEvent } from "react";
import { useForm } from "react-hook-form";
import CloseIcon from "@/public/icon/close.svg";
import SearchIcon from "@/public/icon/search.svg";

interface Props {
  keyword?: string;
  setKeyword: Dispatch<SetStateAction<string>>;
  initialKeyword?: string;
  placeholder?: string;
}

const SearchInput = ({ keyword, setKeyword, initialKeyword, placeholder = "검색어를 입력하세요." }: Props) => {
  const { register, getValues, setValue, watch } = useForm({
    defaultValues: {
      search: initialKeyword,
    },
  });
  const { search } = watch();

  const handleSearchEnter = (event: KeyboardEvent) => {
    if (event.keyCode === 13) {
      setKeyword(getValues("search") ?? "");
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

  useEffect(() => {
    setValue("search", keyword);
  }, [keyword]);

  return (
    <div className="relative">
      <input
        className="h-44 w-full rounded-full bg-gray-50 px-16 py-12 pr-68 text-16 text-black-white placeholder:text-gray-400 focus:outline-none pc:h-52 pc:border pc:border-gray-100 pc:bg-white-black pc:px-20 pc:pr-76"
        placeholder={placeholder}
        {...register("search")}
        onKeyDown={handleSearchEnter}
        autoComplete="off"
      />
      <button className="flex-center absolute right-12 top-4 h-36 w-36 rounded-full bg-gray-50 pc:top-8" type="button" onClick={() => setKeyword(getValues("search") ?? "")}>
        <SearchIcon width="20" height="20" stroke="#494F5A" />
      </button>
      {search && (
        <button className="absolute right-48 top-[1.4rem] pc:right-56 pc:top-[1.8rem]" type="button" onClick={handleCloseClick}>
          <CloseIcon stroke="#A0A5B1" width="16" height="16" />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
