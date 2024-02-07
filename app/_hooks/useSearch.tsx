import { useEffect, useState } from "react";

export const useSearch = (refetchFunc: () => any) => {
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    refetchFunc();
  }, [keyword]);

  return { keyword, setKeyword };
};
