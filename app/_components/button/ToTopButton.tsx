import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";
import ArrowUp from "@/public/icon/arrow-up_full.svg";

interface Props {
  deps?: any[];
  containerId?: string;
  scrollPoint?: number;
  className: CSSProperties & string;
  children?: ReactNode;
}

const ToTopButton = ({ deps = [], containerId, scrollPoint = 250, className, children }: Props) => {
  const [toggle, setToggle] = useState(false);
  const container = useRef<Element | null | (Window & typeof globalThis)>();

  const handleScroll = () => {
    if (!container.current) {
      return;
    }

    let scroll: number;
    if ("scrollY" in container.current) {
      scroll = container.current.scrollY;
    } else {
      scroll = container.current.scrollTop;
    }

    scroll > scrollPoint ? setToggle(true) : setToggle(false);
  };

  useEffect(() => {
    if (containerId) {
      container.current = document.querySelector(`#${containerId}`);
    } else {
      container.current = window;
    }

    container.current?.addEventListener("scroll", handleScroll);

    return () => {
      container.current?.removeEventListener("scroll", handleScroll);
    };
  }, deps);

  const goToTop = () => {
    if (!container.current) {
      return;
    }

    container.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return toggle ? (
    <button onClick={goToTop} className={`bg-main-pink-500 p-12 ${className}`}>
      <ArrowUp />
      {children}
    </button>
  ) : null;
};

export default ToTopButton;
