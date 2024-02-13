import { KeyboardEvent } from "react";

export const handleEnterDown = (event: KeyboardEvent, openFunc: () => void) => {
  if (event.key === "Enter") {
    event.preventDefault();
    openFunc();
  }
};
