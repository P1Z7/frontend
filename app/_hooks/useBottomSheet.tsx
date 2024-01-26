import { useState } from "react";

export const useBottomSheet = () => {
  const [bottomSheet, setBottomSheet] = useState("");

  const openBottomSheet = (type: string) => {
    setBottomSheet(type);
  };

  const closeBottomSheet = () => {
    setBottomSheet("");
  };

  return { bottomSheet, openBottomSheet, closeBottomSheet };
};
