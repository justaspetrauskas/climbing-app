import React from "react";
import style from "./button.module.css";

interface ButtonProps {
  type?: "Primary" | "Secondary" | "Tertiary" | "Submit" | "IconOnly";
  size?: "sm" | "md" | "lg";
  clickHandler: (e?: any) => void;
  children: React.ReactNode;
  title?: string;
  disabled?: boolean;
}

const Button = ({
  type = "Primary",
  children,
  clickHandler,
  title = "Button",
  disabled = false,
  size = "md",
}: ButtonProps) => {
  const buttonClickHandler = () => {
    if (!disabled) {
      clickHandler();
    }
  };

  return (
    <button
      className={`${style["btn-main"]} ${
        style[`btn-${type.toLocaleLowerCase()}`]
      } ${
        size === "sm"
          ? style["btn-sm"]
          : size === "md"
          ? style["btn-md"]
          : style["btn-lg"]
      }`}
      onClick={buttonClickHandler}
      type="button"
      title={disabled ? "Button is disabled" : title}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
