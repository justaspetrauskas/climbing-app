import React from "react";
import style from "./button.module.css";

interface ButtonProps {
  type?: "Primary" | "Secondary" | "Tertiary" | "Submit" | "IconOnly";
  size?: "sm" | "md" | "lg";
  clickHandler?: (e?: any) => void;
  children: React.ReactNode;
  title?: string;
  disabled?: boolean;
  styled?: "styled" | "rounded";
}

const Button = ({
  type = "Primary",
  children,
  clickHandler,
  title = "Button",
  disabled = false,
  size = "md",
  styled = "styled",
}: ButtonProps) => {
  const buttonClickHandler = () => {
    console.log("i'm here", disabled);
    if (clickHandler) {
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
      } ${styled === "styled" ? style["btn-styled"] : style["btn-rounded"]} `}
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
