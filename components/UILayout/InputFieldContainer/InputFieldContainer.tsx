import React from "react";
import style from "./inputfield.module.css";

interface InputFieldContainerProps {
  children: React.ReactNode;
  label?: string;
}
const InputFieldContainer = ({ children, label }: InputFieldContainerProps) => {
  return (
    <div className={style["form-field"]}>
      {label && (
        <label className={style["form-Input-label"]} htmlFor={`input-${label}`}>
          {label}
        </label>
      )}

      {children}
    </div>
  );
};

export default InputFieldContainer;
