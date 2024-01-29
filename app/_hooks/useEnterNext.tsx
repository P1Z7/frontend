import { KeyboardEvent, useRef } from "react";

const useEnterNext = () => {
  const formSection = useRef<HTMLFormElement>(null);

  const handleEnterNext = (e: KeyboardEvent) => {
    const formChildren = Array.from(formSection.current?.querySelectorAll("input, button")!);
    const currentIdx = formChildren.indexOf(e.target as HTMLElement);
    const nextStep = formChildren[currentIdx + 1] as HTMLElement;
    if (e.key === "Enter" && nextStep) {
      e.preventDefault();
      nextStep.focus();
    }
  };

  return { formSection, handleEnterNext };
};
export default useEnterNext;
