import { useState, useEffect } from "react";
import { MdKeyboardArrowUp } from "react-icons/md";
const ScrollBtnToTop = () => {
  const [scrollPosition, setPosition] = useState(0);

  useEffect(() => {
    function updatePosition() {
      setPosition(window?.scrollY);
    }

    window.addEventListener("scroll", updatePosition, { passive: true });
    //  updatePosition();
    return () =>
      window.removeEventListener("scroll", updatePosition, {
        passive: true,
      } as EventListenerOptions);
  }, []);

  const scrollHandler = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div
      title="Go to Top"
      className={`lg:w-[44px] lg:h-[44px] w-8 h-8 border border-gray-500 text-gray-700 rounded-full bg-white hover:bg-hover hover:text-white hover:border-none fixed z-40 right-1 bottom-16 lg:right-10  flex items-center justify-center shadow-md cursor-pointer ${
        scrollPosition <= 450 ? "hidden" : ""
      }`}
      onClick={scrollHandler}
    >
      <span className="text-lg lg:text-[24px] font-semibold">
        <MdKeyboardArrowUp />
      </span>
    </div>
  );
};

export default ScrollBtnToTop;
