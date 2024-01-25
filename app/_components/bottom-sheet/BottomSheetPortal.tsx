"use client";

import { ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface Props {
  children: ReactNode;
}

function BottomSheetPortal({ children }: Props) {
  const [mountedPortal, setMountedPortal] = useState<Element | null>(null);

  useEffect(() => {
    setMountedPortal(document.querySelector("#bottom-sheet"));
  }, []);

  if (!mountedPortal) return;
  return ReactDOM.createPortal(children, mountedPortal);
}

export default BottomSheetPortal;
