import { useState, useRef, useLayoutEffect } from "react";

export default function useScrollBarPosition() {
  const [top, setTop] = useState(0);
  const ref = useRef();

  // console.log("TOP", { top });

  useLayoutEffect(() => {
    function getTopPosition() {
      const topPosition = ref.current.scrollTop;
      setTop(topPosition);
    }
    const currentRef = ref.current.addEventListener("scroll", getTopPosition);
    getTopPosition();
    return () => currentRef?.removeEventListener("scroll", getTopPosition);
  }, []);

  return [ref, top];
}
