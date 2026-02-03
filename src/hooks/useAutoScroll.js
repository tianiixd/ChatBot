import { useEffect, useRef } from "react";

export default function useAutoScroll(dependencies) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
  return scrollRef;
}
