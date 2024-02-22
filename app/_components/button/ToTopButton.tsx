import { CSSProperties, ReactNode, useEffect, useState } from "react";

interface Props {
  containerId?: string;
  scrollPoint?: number;
  className: CSSProperties & string;
  children?: ReactNode;
}

const ToTopButton = ({ containerId, scrollPoint = 250, className, children }: Props) => {
  const [toggle, setToggle] = useState(false);
  let container: Element | null | (Window & typeof globalThis);

  const handleScroll = () => {
    if (!container) {
      return;
    }

    let scroll: number;
    if ("scrollY" in container) {
      scroll = container.scrollY;
    } else {
      scroll = container.scrollTop;
    }

    scroll > scrollPoint ? setToggle(true) : setToggle(false);
  };

  useEffect(() => {
    if (containerId) {
      container = document.querySelector(`#${containerId}`);
    }

    if (!container) {
      container = window;
      return;
    }

    container.addEventListener("scroll", handleScroll);

    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const goToTop = () => {
    if (!container) {
      return;
    }

    container.scrollTo({ top: 0, behavior: "smooth" });
  };

  return toggle ? (
    <button onClick={goToTop} className={className}>
      {children}
    </button>
  ) : null;
};

export default ToTopButton;
