import { useState, useRef, useLayoutEffect } from "react";

export default function useScrollBarPosition() {
  const [top, setTop] = useState(0);
  console.log("TOP", { top });
  const ref = useRef();

  useLayoutEffect(() => {
    function getTopPosition() {
      const topPosition = ref.current.scrollTop;
      console.log({ topPosition, ref });
      setTop(topPosition);
    }
    const currentRef = ref.current.addEventListener("scroll", getTopPosition);
    getTopPosition();
    return () => currentRef.removeEventListener("scroll", getTopPosition);
  }, []);

  return [ref, top];
}
