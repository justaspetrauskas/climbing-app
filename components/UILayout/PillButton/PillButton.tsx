import React from "react";
import style from "./pillButton.module.css";

interface PillButtonProps {
  children: React.ReactNode;
  clickHandler: (e?: any) => void;
  active: boolean;
}

const PillButton = ({
  children,
  clickHandler,
  active = false,
}: PillButtonProps) => {
  return (
    <button
      className={`${style["pill-btn"]} ${
        active ? style["pill-btn--active"] : ""
      }`}
      onClick={clickHandler}
    >
      {children}
    </button>
  );
};

export default PillButton;
