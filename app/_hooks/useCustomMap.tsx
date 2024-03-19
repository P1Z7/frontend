import { useEffect, useRef, useState } from "react";
import { EventCardType } from "@/types/index";

const useCustomMap = () => {
  const [toggleTab, setToggleTab] = useState(true);
  const [selectedCard, setSelectedCard] = useState<EventCardType | null>(null);

  const handleCardClick = (select: EventCardType) => {
    setSelectedCard(select.id === selectedCard?.id ? null : select);
  };

  const handleButtonClick = () => {
    setToggleTab((prev) => !prev);

    if (toggleTab) {
      setSelectedCard(null);
    }
  };

  const scrollRef = useRef<HTMLDivElement>();

  const scrollRefCallback = (el: HTMLDivElement) => {
    scrollRef.current = el;
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [selectedCard?.id, toggleTab]);

  const mapVar = {
    toggleTab,
    setToggleTab,
    selectedCard,
    setSelectedCard,
  };

  const mapCallback = {
    handleCardClick,
    handleButtonClick,
    scrollRefCallback,
  };

  return { mapVar, mapCallback };
};

export default useCustomMap;
