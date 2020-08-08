import { useEffect, useRef } from "react";

export const useClickOutside = (handler: any) => {
  let domNode = useRef<any>();

  useEffect(() => {
    const outsideClickHandler = (event: React.MouseEvent<HTMLElement> | any) => {
      if (!domNode.current.contains(event.target)) handler();
    };

    document.addEventListener("click", outsideClickHandler);
    return () => {
      document.removeEventListener("click", outsideClickHandler);
    };
  });
  return domNode;
};
