import { KeyboardEvent, useState } from "react";

// brrr 적용
//onNext 안주면 submit
export const checkEnterNextButton = () => {
  const [isError, setIsError] = useState(false);

  const handleEnterError = (e: KeyboardEvent, rule: boolean, onNext?: () => void) => {
    if (e.key === "Enter") {
      if (!onNext || !rule) {
        e.preventDefault();
      }

      if (onNext && rule) {
        onNext();
      }
      setIsError(false);
      setTimeout(() => {
        setIsError(true);
      }, 500);
    }
  };

  return { isError, handleEnterError };
};
