import React, { RefObject, useEffect, useRef } from "react";

interface UseOutsideClickProps {
  ref: RefObject<HTMLElement>;
  clickHandler: (e: MouseEvent) => void;
}

const useOutsideClick = ({ ref, clickHandler }: UseOutsideClickProps) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        clickHandler(e);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  return ref;
};

export default useOutsideClick;
