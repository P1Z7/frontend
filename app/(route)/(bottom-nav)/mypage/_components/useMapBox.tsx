import { useState } from "react";

export const useMapBox = () => {
  const [mapBox, setMapBox] = useState("");

  const openMapBox = (type: string) => {
    setMapBox(type);
  };

  const closeMapBox = () => {
    setMapBox("");
  };

  return { mapBox, openMapBox, closeMapBox };
};
