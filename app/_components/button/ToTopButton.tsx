import { CSSProperties, ReactNode, useEffect, useState } from "react";

interface Props {
  scrollPoint?: number;
  className: CSSProperties & string;
  children?: ReactNode;
}

const ToTopButton = ({ scrollPoint = 250, className, children }: Props) => {
  const [toggle, setToggle] = useState(true);

  const handleScroll = () => {
    const { scrollY } = window;

    scrollY > scrollPoint ? setToggle(true) : setToggle(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return toggle ? (
    <button onClick={goToTop} className={className}>
      {children}
    </button>
  ) : null;
};

export default ToTopButton;
