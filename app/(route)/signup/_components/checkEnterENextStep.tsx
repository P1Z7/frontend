import { KeyboardEvent, useState } from "react";

// brrr 적용
export const checkEnterENextStep = () => {
  const [isError, setIsError] = useState(false);

  const handleNextEnterError = (e: KeyboardEvent, rule: boolean, onNext: () => void) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (rule) {
        onNext();
      }
      setIsError(false);
      setTimeout(() => {
        setIsError(true);
      }, 500);
    }
  };

  return { isError, handleNextEnterError };
};
